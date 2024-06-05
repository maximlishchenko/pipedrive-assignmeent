# Pipedrive Home Challenge

This project is a small Express.js application written in TypeScript with endpoints that
interact with the Pipedrive public API.

## Running the project

1. Download .zip or clone the project from GitHub.

2. Navigate to the project root directory in the __terminal__.

3. Create .env file with the following environment variables:
    ```sh
    PORT=3000
    API_TOKEN=0147119688c79f69230677cec3266b1b0050341f
    PIPEDRIVE_API_URL=https://api.pipedrive.com/v1/
    ```

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

Path parameter {id} is the ID of the deal to be modified.

Example request body:
   ```sh
   {
     "title": "newDealName"
   }
   ```

- Get metrics

| Endpoint (GET) |
| ------ |
| localhost:{PORT}/api/metrics |  
   
### Running tests

* Tests are written using Supertest and Jest. To run the tests for the endpoints, execute
    ```sh
   npm test
   ```

## Task Descriptions and Design Decisions

### Part I:
* The application code for Part I is contained in the src/ folder and instructions on how to interact with the endpoints are presented above. Tests for the endpoints were written using Supertest and Jest, and are stored in __\_\_tests\_\___ directory. The tests include successful cases, as well as cases such as accessing an endpoint without a valid api token, creating a deal without providing a title, updating a deleted or a non-existent deal, etc. In such cases appropriate status codes and __success__ boolean value are expected.
### Part II:
* I created a __logging-middleware.ts__ file to log what kind of request method (GET, POST, PUT, etc) was used, as well as the request's original URL.
  In order to save metrics about the endpoints, I created two interfaces:
  1. __IEndpointMetrics__ which includes the number of times the endpoint was called, as well as the total request duration. These are used to calculate the mean request duration.
  2. __IMetrics__ which maps each of the endpoints (getDeals, addDeal, updateDeal) to IEndpointMetrics.
  
  Each time an endpoint is accessed, the request duration is logged and the call count for this endpoint incremented by 1.

  At the moment the metrics are stored in an in-memory __IMetrics__ data structure described above, however each time the server is restarted these are reset. One future work opportunity is connecting a database to store metrics in persistent storage instead.
### Part III:
* As per task description for Part III, I created a __ci.yml__ file in .github/workflows/ directory that performs the following actions when a commit is pushed to a pull-request (for node versions 16, 18 and 20):
  1. checks out the repository
  2. sets up appropriate node environment
  3. installs the required dependencies using npm install
  4. sets up the needed environment variables, accessing them through GitHub secrets (I created them beforehand)
  5. lints the code
  6. runs tests
### Part IV:
* Similarly, I created a __cd.yml__ file that simply logs a "Deployed!" message on any push to the main branch, which also includes the case when a pull-request is merged to main.
### Part V:
* I decided to write a Dockerfile that uses a multi-stage build to separate build and production environments. In the build stage, all dependencies from package.json are installed, and the build script is run. In the production stage, the devDependencies are ignored in order to minimise the size of the final image. Also, the built artifacts from the built stage are copied into /dist.

  I created two docker compose files where each uses the appropriate stage from Dockerfile and runs on a different external port (3001 or 3002).
