# MoneySprouts

## Start the app for local development

1. (optional) Create a `.env.local` to provide custom configuration for your local environment
2. To start the development server run `docker-compose up -d --build`.
3. Unless you changed the APP_PORT it will provide the Web-App: [http://localhost:8101/](http://localhost:8101/)
4. Unless you changed the APP_DB_ADMIN_PORT it will provide the DB
   Admin: [http://localhost:8102/](http://localhost:8102/)

You can run `nx run client:build:development` or `nx run client:build:development --watch` to compile the frontend code.
