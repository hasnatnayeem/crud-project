### Intro
## Intro
This is the frontend project for the CRM REST API project. It is implemented using **Angular 12**. From the application a user can perform following actions.
- See list of all customers
- See details of individual customer
- Add a new customer
- Update information of a customer
- Delete a customer
- Search customer by name or email

The live version of this project can be explored using swagger documentation via the following url.

http://frontend.hasnatnayeem.com



---
## Running the project 
The project can be run as a generic NodeJS application in the development environment or in a docker container.

### Setting up environment variables
The base API URL for the angular application is configured by configuration file in **src/environments/environment.ts**. 

```
export const environment = {
  production: false,
  apiBaseUrl: 'http://backend.hasnatnayeem.com/v1'
};
```

### Running using Docker
There is a Dockerfile inside the project directory. Using docker command a docker image can be built from this file. The command needs to be run from inside the **frontend** project directory.
```
docker build -t hasnatnayeem/frontend .
```

The "**-t**" flag is for tagging the image with a name. The "**.**" refers to the current directory. The image building time can take a while. Once done, the newly created image can be run as a docker container with the following command.

```
docker run -d --name frontend -p 4200:80 hasnatnayeem/frontend
```
The "**--name**" flag tags the container with a name. The "**-p**" flag maps port **4200** of host machine to the internal port **80** of the docker container which was exposed using the Dockerfile. After this the name of the docker image, created in last step, is passed. Once the container runs successfully, the angular application can be accessed from localhost http://localhost:4200.


### Running without Docker
The project can be run in the local machine using npm. At first the dependencies need to be installed using following command.

```
npm install
```

Till this point the dependencies are installed and the project is ready to be run using following command.
```
npm run start
```

If the project is running successfully in localhost, it can be accessed at http://localhost:4200.


---
## Project structure
Modular file structure pattern have been followed as per angular style guide. Important files necessary for building the user interface is stored in **src**.

**cypress** directory holds all necessary files needed for end-to-end testing. Unit tests are run using **Karma**.

### src/app directory
Angular components, services, mock-service for testing, models, routing file are kept in this directory.

There are three major components in this project.
- Customer listing component for seeing all customers
- Customer details component for both adding new customer and previewing existing customer data
- Search component for holding search functionality

A dedicated service was created for Event Queueing. It helps communication between application components using pub-sub design pattern. Components emmit different events and this service act as a event broker to let specific subscribers to know and react on the event.

The customer service is responsible for maintaining components http communication with the backend API.

The MDBootstrap UI library is used for the UI. The customer details component utilizes the modal service offered by **MDBootstrap** library to show modal from any component and from any where of the application.

There are two routes of this application. The root route "**/**" and another route for **"customers"**. Currently the root route redirects to the **"customers"**.


### Tests
The unit tests are located alongside the main file for easier access to testing with karma.

End-to-end testing written in cypress checks if all the functionality of the UI is accessible from the browser or not.