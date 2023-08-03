FROM php:8.1-apache

RUN a2enmod rewrite

RUN apt-get update && apt-get install -y git unzip zip

WORKDIR /var/www/html

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions gd pdo_mysql bcmath zip intl opcache

COPY --from=composer:2.5 /usr/bin/composer /usr/local/bin/composer

# Copy your application code to the container (make sure you have a .dockerignore)
# COPY . /var/www/html/

# # Make our entrypoint executable
# COPY docker/server/docker-entrypoint.sh /usr/local/bin/
# RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# # Set the entrypoint script to execute by default when a new container starts
# ENTRYPOINT ["docker-entrypoint.sh"]
