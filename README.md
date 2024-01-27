# Money Sprouts

[![Maintainability](https://api.codeclimate.com/v1/badges/c78b6a634c70f52b7499/maintainability)](https://codeclimate.com/github/Paneon/money-sprouts/maintainability)

![Profile View Counter](https://komarev.com/ghpvc/?username=Paneon)

## Description

Money Sprouts is an application designed to teach children the value of saving and spending their pocket money sensibly. Through a fun and interactive interface, children can manage their savings, view transaction histories, plan purchases, and even earn extra by doing chores.

<img src="https://github.com/LisaPMunich/money-sprouts/assets/99111208/35fb3553-6460-4872-a945-28a471a1c23d" width="600" alt="Application mockups on different devices">

## Features

### Family Account

- **Family Login**: One login for the entire family which encompasses the accounts of all children and an admin account for parents.
- **User Selection**: Children can easily switch between accounts to view their respective dashboards and go back by clicking on the avatar in the page header.

<img width="600" alt="start, login and account selection - mobile view" src="https://github.com/LisaPMunich/money-sprouts/assets/99111208/a76eaa65-406d-4aea-8a70-bfafd08be6ff">

### Dashboard

The dashboard is the central interface from where the user can navigate to the pages overview, history and plan.

 <img width="600" alt="dashboard - tablet" src="https://github.com/LisaPMunich/money-sprouts/assets/99111208/834acff7-5be7-497a-add9-04b2f6498f83">

- **Overview Tile**: Shows the total money saved, a dynamic picture that changes as the savings hit certain milestones, countdown to the next pocket money day, and the weekday of the next pocket money day.

<img width="600" alt="overview history earn  - mobile view" src="https://github.com/LisaPMunich/money-sprouts/assets/99111208/d376a370-f50c-4dc1-abd6-998f5e0bf86a">

- **History Tile**: Provides a table of earnings and expenses with a limit of up to 20 items. Expands by 5 items at a time for easier navigation.

- **Plan Tile**: Split into two tabs - "I want to spend money" and "I want to earn extra money".

  - **Spend Money Tab**: Allows children to calculate and apply for expenses. Expenses need admin (parent) approval before being deducted from the account.

  - **Earn Money Tab**: Lists chores with monetary rewards. Kids can select a chore, temporarily calculate the addition to the total sum and then submit it for approval by their parents. Once it is approved, the amount is permantently added to the total sum.

### Application Details

- **Optimized for All Devices**: Works seamlessly on mobile, tablet, and desktop.
- **Performance**: Improved loading time and navigation using resolver and browser animations.
- **Error Handling**: Display of error, info and sucess messages for improved user experience. Error Logging.
- **Multi-Language Support, ngx-translate library**: Users can switch between English and German and read the translated text.

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

## Database Migration and seeding

To work on a local environment you need a database and potentially seed some sample data into it.
To accomplish this go into the docker server container:

Create the database and execute the migrations

```bash
./bin/console doctrine:migrations:migrate
```

Load initial sample data into the database:

```bash
./bin/console doctrine:fixtures:load
```

## Credits and Acknowledgements

### Icons and illustrations used in the project

- **Icons**:

  - The illustrations on the overview page are sourced from Icons 8 from Ouch! https://icons8.de/
  - The rest of the icons (like the money bag, the bill with hour glass, the calculator, pile of coins, shopping cart, logout icon, germany flag, usa flag and back arrow) are all icons sourced from Icons 8.

- **Avatar Images**: The avatars in the user selection and page header were sourced from Flaticon.

  - <a href="https://www.flaticon.com/free-icons/girl" title="girl icons">[Girl icon created by Freepik - Flaticon]</a>
  - <a href="https://www.flaticon.com/free-icons/avatar" title="avatar icons">[Boy icon created by Freepik - Flaticon]</a>

- **Background image**
  - <a href="https://www.thatsmandarin.com/wp-content/uploads/2019/04/money4.jpg" title="money jars">[Money jars growing sourced from thatsmandarin]
