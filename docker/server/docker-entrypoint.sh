#!/bin/sh
# docker-entrypoint.sh

# install composer dependencies
composer install

# run migrations
php bin/console doctrine:migrations:migrate --no-interaction

# start apache
apache2-foreground
