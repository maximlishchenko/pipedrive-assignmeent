# Pipedrive Home Challenge 2024

This project is a small Express.js application written in TypeScript with endpoints that
interact with the Pipedrive public API.

## Getting started

1. Download .zip or clone the project from GitHub.

2. Navigate to the project root directory in the __terminal__.

3. Ensure you have Docker installed on your device and the Docker engine is running.

## Running the project in development environment

1. To build the image and start the container in development environment, execute
    ```sh
    docker-compose -f docker-compose.dev.yml up
    ```

The development environment is exposed on __PORT 3001__.

2. To build the image and start the container in production environment, execute
    ```sh
    docker-compose -f docker-compose.prod.yml up
    ```

The production environment is exposed on __PORT 3002__.

## How to use



### Endpoints

  - Get account by ID  

  | Endpoint (GET) |
  | ------ |
  | localhost:8080/accounts/{account_id} |  
   
  - Create a new account

  | Endpoint (POST) |
  | ------ |
  | localhost:8080/accounts |  

   Example request body:
   ```sh
   {
    "customer_id": 10,
    "country": "Estonia", 
    "currencies": ["EUR", "SEK", "USD", "GBP"]
   }
   ```
  - Create a new transaction

  | Endpoint (POST) |
  | ------ |
  | localhost:8080/accounts/{account_id}/transactions |  

   Example request body:
   ```sh
   {
     "amount": 100,
     "currency": "EUR", 
     "direction": "IN",
     "description": "Salary"
   }
   ```
   
  - Get all transactions by account id  

  | Endpoint (GET) |
  | ------ |
  | localhost:8080/accounts/{account_id}/transactions |  


* RabbitMQ Management panel is located at http://localhost:15672/

* PostgreSQL data

  | ip | localhost:5432 |
  | ------ | ------ |
  | DB | tuum |
  | user | sa |
  | password | password |
  
## Important choises

* Due to time constraints, I decided not to include any tests for the project. Initially, I wasn't planning on submitting the assignment because I lacked time for learning about the required technologies for the assignment. However, something changed on April 17th, and I felt motivated to start working on the solution. As the task doesn't require a perfect solution, I believe it's acceptable to skip the tests for now to submit the solution as soon as possible, escpecially because I've already missed the deadline.

## Horizontal scaling
* Firstly, horizontal scaling requires a change in an application logic. 
* Secondly, it reduces the downtime of an application.
* Thirdly, the initial invested resources (human hours for the change in the application logic & money for the equipment) are higher than when vertically scaling, but later on, the increase in the costs are linear.