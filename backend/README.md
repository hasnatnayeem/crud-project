## Intro
This is the backend REST API project for the CRM project. It is implemented using **ExpressJS** library powered by **Typescript** and **NodeJS**. The **NoSQL** database platform **MongoDB** has been used for data storage. The live version of this project can be explored using swagger documentation via the following url.
http://swagger.hasnatnayeem.com


## Running the project
The project can be run as a generic NodeJS application in the development environment or in a docker container.

### Setting up environment variables
The database connection string is passed to the application using environment variable. A sample environment file is added in the project directory. It need to be copied as **.env**.
```
cp .env.example .env
```

The values in the newly created environment file need to be replaced according to the development enviroment.
```
MONGO_URL=mongodb://localhost:27017/crud-db
PORT=3000
```

### Running using Docker
There is a Dockerfile inside the project directory. Using docker command a docker image can be built from this file. The command needs to be run from inside the **backend** project directory.
```
docker build -t hasnatnayeem/backend .
```

The "**-t**" flag is for tagging the image with a name. The "**.**" refers to the current directory. The image building time can take a while. Once done, the newly created image can be run as a docker container with the following command.

```
docker run -d --name backend -p 3000:3000 hasnatnayeem/backend
```
The "**--name**" flag tags the container with a name. The "**-p**" flag maps port **3000** of host machine to the internal port **3000** of the docker container which was exposed using the Dockerfile. After this the name of the docker image, created in last step, is passed. Once the container runs successfully, the swagger documentation for the API can be accessed from localhost http://localhost:3000/v1/docs.


### Running without Docker
The project can be run in the local machine using npm. At first the dependencies need to be installed using following command.

```
npm install
```

Till this point the dependencies are installed and the project is ready to be run using following command.
```
npm run start
```

If the project is running successfully in localhost, the swagger documentation can be accessed at http://localhost:3000/v1/docs.

## Project structure
The file structure was tried to be kept modular. There are three main directories - **common**, **customers** and **tests**.

### Common files
Common files like interface, service, middleware, config etc. that need to be used througout the application by different components are kept here for convenient access.

### Customer resource files
**Customer** is the primary resource of this REST API application. Files needed to implement the CRUD feature are stored here. It contains controller, DAO (Data Access Object), DTO (Data Transfer Object), enumeration, service, route, validator etc.

### app.ts
The app.ts file connects all the pieces together. It is used for bootstrapping the whole backend application. After doing all necessary configuration, the app is exported so that it can be reused for different purpose.

### index.ts
This file creates the application server importing the app.ts file. The port value comes from a config file which in turn comes from environment variable.

### tests
The tests for customer resources are kept inside this directory. Mocha test runner is used to test the API automatically.