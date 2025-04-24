#!/bin/bash
set -e

# Wait for the database to be ready
echo "Waiting for database to be ready..."
while ! mysqladmin ping -h db_server -u root --password="${MYSQL_ROOT_PASSWORD}" --silent; do
    sleep 1
done

# Install Composer dependencies
echo "Installing Composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

# Create database if it doesn't exist
echo "Creating database if it doesn't exist..."
mysql -h db_server -u root --password="${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};"

# Run database migrations
echo "Running database migrations..."
php bin/console doctrine:migrations:migrate --no-interaction

# Install and build Angular app using Encore
echo "Installing and building Angular app..."
npm install
npm run build

# Start Apache
echo "Starting Apache..."
exec apache2-foreground
