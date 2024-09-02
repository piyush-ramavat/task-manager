# Task Manager

A simple NodeJs and ReactJS project to manage a user's tasks.

This project allows user to create and manage their tasks with description and prioritize the tasks using due dates and statuses

## Getting Started

This is a mono repo containing code and scripts for both Backend and Frontend.

<b>Following are the pre-requisites to run the project locally </b>

- Postgres with database created for task-manager. (Required Schema and tables with seed data will be done by npm script)
- NodeJs `v20.10.0` or higher
- Npm `v10.2.3` or higher
- Duplicate `sever/.env.sample` and rename it to `.env`
- Duplicate `ui/.env.sample` and rename it to `.env`
- Set the values for all ENV variables
- then run following commands

Install dependencies:

```bash
npm install:all
```

This will install all the dependencies required to run Backend as well as Frontend

Create database schema, tables and seed the data:
> `IMP` - This will "delete" all the date and re-create the tables and one default user `{id: -1, name: "Default User", email: "default-user@local.com" }`

```bash
npm run db:setup
```

To run backend server in development mode:

```bash
npm run dev
```

This will start a tsc compiler and dev server both.

For production build of backend:

```bash
npm run build:backend
npm run start:backend
```

To run frontend in development mode:

```bash
npm run start:frontend
```

This will start a tsc compiler and dev server both.

For production build of backend:

```bash
npm run build:frontend
```

For clean install

```bash
npm run cleanup:install:all
```

Please refer to respective `package.json` files for backend and frontend scripts and run commands.

### Check whether service and APIs are up and running

Open [http://localhost:3000/health-check](http://localhost:3000/health-check) with your browser to see the result. <br/>
Open [http://localhost:3001](http://localhost:3001) with your browser to see the frontend(ui). <br/>


## Workflow & Steps

1. The initialization scripts creates a default user, so as soon as dependencies are installed and services are running, the app should be ready to test
2. There is no credential based Auth hence only email based auth is implemented. (and hence default user's email is pre-populated)
3. There are /admin routes to create more users and once created you can use those email id(s) to create respective tasks. Refer to `/serve/http-files`. (You can use VSCode's RESTClient extension to test the APIs)
4. From UI, you can add, edit the tasks as needed. 
5. Status will be derived based on current date and 7 days on time window.
6. The Pagination, filter (search) and Sort is done on frontend side only.



