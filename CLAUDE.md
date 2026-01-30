# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Money Sprouts is a full-stack application teaching children financial literacy. It has a Symfony 6.3 PHP backend with API Platform generating REST APIs, and an Angular 19 standalone components frontend.

## Tech Stack

- **Frontend**: Angular 19 (standalone components), TypeScript 5.8, Bootstrap 5.2, ngx-translate
- **Backend**: PHP 8.1+, Symfony 6.3, Doctrine ORM, API Platform 3.1
- **Database**: MariaDB 10.4.4
- **Infrastructure**: Docker, Apache, PHP-FPM

## Development Commands

### Frontend (npm)
```bash
npm run dev              # Watch mode development build
npm run serve            # Angular dev server with proxy
npm run build            # Production build
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix
npm run test             # Jest unit tests
npm run test:watch       # Jest watch mode
npm run cypress:open     # Cypress E2E tests
```

### Backend (composer)
```bash
composer run php:stan       # PHPStan static analysis (level 5)
composer run php:test       # PHPUnit tests
composer run php:lint       # PHP Code Sniffer
composer run php:lint:fix   # Auto-fix code style
composer run cache          # Clear and warmup cache
```

### Database
```bash
./bin/console doctrine:migrations:migrate    # Run migrations
./bin/console doctrine:fixtures:load         # Load seed data
```

### Local Development
```bash
docker-compose up -d --build    # Start services
npm run dev                      # In separate terminal for frontend
```
- App: http://localhost:8101
- phpMyAdmin: http://localhost:8102

## Architecture

### Frontend (`/assets/client/`)
- `app/pages/` - Page components (dashboard, login, account-selection, plan, transaction-history, balance-overview)
- `app/components/` - Reusable components
- `app/services/` - HTTP services and business logic
- `app/types/` - TypeScript interfaces (some generated from API)

### Backend (`/src/`)
- `Controller/Api/` - REST API endpoints
- `Entity/` - Doctrine entities (Account, User, Transaction, Avatar, Category)
- `Repository/` - Data access layer
- `Service/` - Business logic
- `DataFixtures/` - Database seeding

## Code Standards

### Angular/TypeScript
- Standalone components only (no NgModules)
- OnPush change detection
- Max 4 parameters per function
- Max 50 lines per function
- Max 120 character line length
- Nesting max 2 levels deep

### PHP
- PSR-2 coding standard
- PHPStan level 5
- Strict typing required

## Key Patterns

- API Platform auto-generates REST endpoints from entities
- ngx-translate handles i18n (EN/DE) - translations in `/translations/`
- Parent approval workflow for child transactions
- Family account system with single login for multiple children
