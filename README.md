# Pipedrive Home Challenge

This project is a small Express.js application written in TypeScript with endpoints that
interact with the Pipedrive public API.

## Running the project

1. Download .zip or clone the project from GitHub.

2. Navigate to the project root directory in the __terminal__.

3. Create .env file with the following environment variables:

PORT=3000
API_TOKEN=0147119688c79f69230677cec3266b1b0050341f
PIPEDRIVE_API_URL=https://api.pipedrive.com/v1/

You can modify the api token in order to use another Pipedrive account.

4. Ensure you have Docker installed on your device and the Docker engine is running.

5. To build the image and start the container in development environment, execute
    ```sh
    docker-compose -f docker-compose.dev.yml up
    ```

The development environment is exposed on __PORT 3001__.

6. To build the image and start the container in production environment, execute
    ```sh
    docker-compose -f docker-compose.prod.yml up
    ```

The production environment is exposed on __PORT 3002__.

## How to use

### Endpoints

Note that in this setup the port will depend on whether you are accessing the development (3001) or production (3002) environment.

  - Get all deals

  | Endpoint (GET) |
  | ------ |
  | localhost:{PORT}/api/deals |  
   
  - Create a new deal

  | Endpoint (POST) |
  | ------ |
  | localhost:{PORT}/api/deals |  

    As per Pipedrive API, title (string) is required.
    Example request body:
   ```sh
   {
    "title": "myDeal123",
    "value": "5000"
   }
   ```

  - Update a deal

  | Endpoint (PUT) |
  | ------ |
  | localhost:{PORT}/api/deals/{id} |  

    Path parameter {id} is the ID of the deal to be modified
   Example request body:
   ```sh
   {
     "title": "newDealName"
   }
   ```
   
### Running tests

* Tests are written using Supertest and Jest. To run the tests for the endpoints, execute
    ```sh
   npm test
   ```
  
## Important choises

* Due to time constraints, I decided not to include any tests for the project. Initially, I wasn't planning on submitting the assignment because I lacked time for learning about the required technologies for the assignment. However, something changed on April 17th, and I felt motivated to start working on the solution. As the task doesn't require a perfect solution, I believe it's acceptable to skip the tests for now to submit the solution as soon as possible, escpecially because I've already missed the deadline.

## Horizontal scaling
* Firstly, horizontal scaling requires a change in an application logic. 
* Secondly, it reduces the downtime of an application.
* Thirdly, the initial invested resources (human hours for the change in the application logic & money for the equipment) are higher than when vertically scaling, but later on, the increase in the costs are linear.