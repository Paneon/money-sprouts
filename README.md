# MoneySprouts

## Description

Money-Sprouts is an application designed to teach children the value of saving and spending their pocket money sensibly. Through a fun and interactive interface, children can manage their savings, view transaction histories, plan purchases, and even earn extra by doing chores.

<img src="https://github.com/LisaPMunich/money-sprouts/assets/99111208/35fb3553-6460-4872-a945-28a471a1c23d" width="600" alt="Application mockups on different devices">

## Features

### Family Account

- **Family Login**: One login for the entire family which encompasses the accounts of all children and an admin account for parents.
- **User Selection**: Children can easily switch between accounts to view their respective dashboards.

### Dashboard

- **Overview Tile**: Shows the total money saved, a dynamic picture that changes as the savings hit certain milestones, countdown to the next pocket money day, and the weekday of the next pocket money day.

- **History Tile**: Provides a table of earnings and expenses with a limit of up to 20 items. Expands by 5 items at a time for easier navigation.

- **Plan Tile**: Split into two tabs - "I want to spend money" and "I want to earn extra money".

  - **Spend Money Tab**: Allows children to calculate and apply for expenses. Expenses need admin (parent) approval before being deducted from the account.

  - **Earn Money Tab**: Lists chores with monetary rewards. Kids can select a chore to earn extra, which is added to their account once approved by parents.

### Application Details

- **Optimized for All Devices**: Works seamlessly on mobile, tablet, and desktop.
- **Performance**: Improved loading time and navigation using resolver and browser animations.

## Upcoming Features

- **Multi-Language Support**: Soon, Money-Sprouts will be available in both English and German.

## Start the app for local development

1. (optional) Create a `.env.local` to provide custom configuration for your local environment
2. To start the development server run

```bash
docker-compose up -d --build
```

3. Unless you changed the APP_PORT it will provide the Web-App: [http://localhost:8101/](http://localhost:8101/)
4. Unless you changed the APP_DB_ADMIN_PORT, it will provide the DB
   Admin: [http://localhost:8102/](http://localhost:8102/)
5. To compile the frontend code run either

```bash
nx run client:build:development
nx run client:build:development --watch
```
