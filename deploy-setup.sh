#!/bin/bash
# Post-Deployment Setup Script for cPanel
# Run this via SSH after deployment

cd /home/bismsjai/test.bismight.co.uk

echo "🚀 Starting post-deployment setup..."
echo ""

# Copy .env.production to .env if .env doesn't exist
if [ ! -f .env ]; then
    if [ -f .env.production ]; then
        cp .env.production .env
        echo "✅ Created .env from .env.production"
    else
        cp .env.example .env
        echo "✅ Created .env from .env.example"
    fi
fi

# Generate application key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    php artisan key:generate --force
    echo "✅ Generated application key"
fi

# Check if database credentials need updating
if grep -q "CHANGE_ME_" .env; then
    echo ""
    echo "⚠️  Database credentials need to be configured!"
    echo ""
    
    # Prompt for database name
    read -p "Enter database name: " db_name
    sed -i "s/CHANGE_ME_database_name/$db_name/" .env
    
    # Prompt for database username
    read -p "Enter database username: " db_user
    sed -i "s/CHANGE_ME_database_user/$db_user/" .env
    
    # Prompt for database password
    read -sp "Enter database password: " db_pass
    echo ""
    sed -i "s/CHANGE_ME_database_password/$db_pass/" .env
    
    echo "✅ Database credentials updated"
else
    echo "✅ Database credentials already configured"
fi

echo ""

# Set proper permissions
chmod -R 755 storage bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache
echo "✅ Set permissions"

# Run migrations
echo ""
echo "🔄 Running migrations..."
php artisan migrate --force
echo "✅ Migrations completed"

# Clear and cache config
echo ""
echo "🔄 Optimizing application..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo "✅ Application optimized"

# Create storage link
php artisan storage:link 2>/dev/null || echo "ℹ️  Storage link already exists"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "✅ Deployment setup complete!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "🌐 Your site: https://test.bismight.co.uk"
echo ""
echo "⚠️  IMPORTANT: Make sure your domain points to:"
echo "   /home/bismsjai/test.bismight.co.uk/public"
echo ""
echo "   In cPanel → Domains → Manage → Edit Document Root"
echo ""
