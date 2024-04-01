# User-Management-API-with-Dockerization

Title: User Management CRUD APIs
Description: This Node.js backend application provides a set of CRUD (Create, Read, Update, Delete) APIs for managing user data.

## Dependencies

1. Node
2. Npm

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run start` to start the server.

## Usage

1. Make sure the server is running.
2. Send HTTP requests to the appropriate endpoints.
   Example:
    GET /user/:id - Retrieve a user
    POST /user - Create a new user
    PUT /user - Update a user
    DELETE /user - Delete a user



## Testing

1. Run `npm run test` to execute the tests.

## Live demo deployed using Render 

1. Base URL : https://user-management-api-with-dockerization.onrender.com
2. To Fetch the details of users use : Method: GET - Base URL + /user
    Example: https://user-management-api-with-dockerization.onrender.com/user
    To Create a user user: Method: POST - Base URL + /user
    Example: https://user-management-api-with-dockerization.onrender.com/user
3. The instance will spin down with inactivity, which can delay requests by 50 seconds or more for the first request after inactivity
