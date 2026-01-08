#!/bin/bash
# Post-Deployment Setup Script for cPanel
# Run this via SSH after deployment

cd /home/bismsjai/test.bismight.co.uk

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

# Prompt for database credentials
echo ""
echo "📝 Please update .env with your database credentials:"
echo "   nano .env"
echo ""
echo "   Update these lines:"
echo "   DB_DATABASE=your_database_name"
echo "   DB_USERNAME=your_database_user"  
echo "   DB_PASSWORD=your_database_password"
echo ""
read -p "Press ENTER after updating .env to continue..."

# Set proper permissions
chmod -R 755 storage bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache
echo "✅ Set permissions"

# Run migrations
php artisan migrate --force
echo "✅ Ran migrations"

# Clear and cache config
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo "✅ Optimized for production"

# Create storage link
php artisan storage:link
echo "✅ Created storage link"

echo ""
echo "✅ Deployment setup complete!"
echo "🌐 Your site: https://test.bismight.co.uk"

