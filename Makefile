.PHONY: setup up down shell test db-setup console

# Default target
setup: up vendor db-setup

# Start containers in detached mode
up:
	docker compose up -d

# Stop containers
down:
	docker compose down

# Helper for composer install
vendor:
	docker compose exec server composer install

# Open a bash shell in the server container
shell:
	docker compose exec server bash

# Run Symfony console commands
console:
	docker compose exec server bin/console $(CMD)

# Setup databases
db-setup:
	@echo "Waiting for database to be ready..."
	@sleep 5
	# Grant permissions for test database using root credentials
	docker compose exec db_server bash -c 'mysql -u root -p"$${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS money_sprouts_test; GRANT ALL PRIVILEGES ON money_sprouts_test.* TO \"$${MYSQL_USER}\"@\"%\"; FLUSH PRIVILEGES;"'
	
	docker compose exec server bin/console doctrine:database:create --if-not-exists
	docker compose exec server bin/console doctrine:schema:update --force
	docker compose exec server bin/console doctrine:database:create --if-not-exists --env=test
	docker compose exec server bin/console doctrine:schema:update --force --env=test

# Run tests
test:
	docker compose exec server vendor/bin/phpunit

# Load fixtures
fixtures:
	docker compose exec server bin/console doctrine:fixtures:load --no-interaction
