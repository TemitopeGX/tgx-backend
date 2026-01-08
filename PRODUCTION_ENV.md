# Production Environment Setup

## What We've Done

Instead of committing your actual `.env` file (which contains sensitive credentials), we've created a **`.env.production`** template that:
- ✅ Can be safely committed to Git
- ✅ Contains all necessary configuration keys
- ✅ Uses placeholder values for sensitive data
- ✅ Gets automatically deployed with your code

## How It Works

1. **`.env.production`** is committed to Git with safe placeholder values
2. During deployment, it gets copied to the server
3. You update the actual credentials on the server (database password, etc.)
4. The real `.env` file stays on the server and is never committed to Git

## Deployment Process

### 1. Deploy Code
```bash
php artisan hostinger:deploy-and-setup-cicd
```

### 2. SSH into Server
```bash
ssh bismsjai@198.187.29.126
```

### 3. Run Setup Script
```bash
cd /home/bismsjai/test.bismight.co.uk
bash deploy-setup.sh
```

The script will:
- Copy `.env.production` to `.env`
- Generate an application key
- Prompt you to edit database credentials
- Set proper permissions
- Run migrations
- Optimize for production

### 4. Update Domain Root in cPanel
Point your domain to: `/home/bismsjai/test.bismight.co.uk/public`

## Security Notes

- ✅ `.env` is still in `.gitignore` (never committed)
- ✅ `.env.production` contains NO real passwords
- ✅ Real credentials only exist on the server
- ✅ GitHub repo remains secure

## Updating Production Config

If you need to add new environment variables:
1. Add them to `.env.production` with placeholder values
2. Commit and push
3. SSH to server and update the real `.env` file
4. Run `php artisan config:cache`
