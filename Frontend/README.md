# Logmar React Template

## Getting started

Congratulations! You don't have to start from scratch. \
We've got quite a few things set up for you already. \
All you have to do is configure a few things and you're good to go.

### Local environment variables
- Clone the `.env.example` file in the root of the project and add the values for the variables.

### Repository environment variables
Create environments in the repository settings. 

> Note: Make sure to create an environment for each environment-branch and give them the ***same*** name.

- In each environment, add the following variables:
  ```
  AZURE_CLIENT_ID
  AZURE_REDIRECT_URI
  AZURE_TENANT_ID
  AZURE_SCOPES
  SERVER_BASE_URL
  ```

### Project metadata
The manifest.json file is used to configure the PWA (Progressive Web App) settings. It is used to configure the app's name, icons, theme color, etc.

- Configure these files with your project's information:
  - `manifest.json`
  - `public/index.html`
  - `package.json`
  - `README.md` (make sure to keep [Common topics](#common-topics))

## About the template

### Contents
- React 
- Vite
- TypeScript
- React Query
- Axios
- SCSS modules
- MSAL
- React Router
- Docker
- MUI
- ESLint

## Common topics
### Environment variables
Whenever you add a new environment variable, make sure to modify these places accordingly:
* `.env.example`
* `Dockerfile`
* `docker-compose.yml`
* Deploy step in pipeline
* Repository environment variables

### React Query + Axios
Axios is used to make HTTP requests. React Query is used to manage the state of the data fetched from the server.
To configure headers and other setting regarding HTTP requests, configure the Axios instance in this project.

To simplify working with React Query, there are 2 hooks that use the configured Axios instance: `useSimpleQuery` and `useSimpleMutation`.

`useSimpleQuery` is used to fetch data from the server. It takes 3 arguments:
1. The URL to fetch data from
2. Query keys that are used to identify the query for caching and such (optional, will be generated from the URL if not provided)
3. Options object for using any other features of React Query (optional)

`useSimpleMutation` is used to send data to the server. It takes 3 arguments:
1. The URL to send data to
2. The method to use (POST, PUT, DELETE, PATCH, etc.)
3. Options object for using any other features of React Query (optional)