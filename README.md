## Intro
This project consist of two separate applications - 
- **Frontend**: http://frontend.hasnatnayeem.com
- **Backend**: http://swagger.hasnatnayeem.com

Each separate project directory contains individual README file. 
Both frontend and backend application is hosted in **AWS EC2** platform.


## Stack
### Frontend
The frontend application uses Angular 12. Unit tests are run by Karma-Jasmine. For end-to-end testing Cypress is used.

### Backend
Backend application is created with ExpressJS library of NodeJS. Typescript is used which is in turn transpiled to plain javascript.

### Database
MongoDB has been used in order to stor the data. The backend uses the library called **mongoose** in order to interact with MongoDB.


### Deployment using docker-compose
All three components of the project can be installed and run separately following individual README files. An easier way would be using docker compose tool. A configuration file is given in the root directory of the project titled **"docker-compose.yml"**. The following command need to be run to make all the docker containers up and running from the source code.

```
docker-compose up -d
```
The flag **"-d"** is used for detaching the whole process from the terminal session once done. After successful running of the command the frontend and backend application should be accessible in the following URLs.
- **Frontend**: http://localhost:4200
- **Frontend**: http://localhost:3000/v1/docs


This docker compose file keeps the backend and mongo container in the same network so that backend can interact with the database properly. Otherwise it could be done using editing the routing table of the host system which is comparatively complex.


### Deployment in AWS EC2
### Preparing Instance
The applications are hosted in a t2.micro EC2 instance of AWS. Ubuntu 20.04 operating system has been used. 25 GB EBS drive was used.

A SSH key was setup while creating the instance to login to it with port 22. The network security configuration was modified to allow access to port 80 (HTTP) and 22 (SSH) only.

An Elastic IP address was allocated to the instance so that it retains a dedicated public IP even if it is turned off or restarted.

As the RAM of the instance was a bit lower in capacity, a swap space of 4 GB was allocated in order to be utilized as virtual memory alongside RAM.

### Deployment
Docker was installed in the system first. Then the project repository was cloned there using **Git**. Then the applications were deployed using docker compose tool.

## Connecting Domain
A personal domain was utilized in order to point to the applications running in different ports in the EC2 instance.

The Elastic IP address of the instance was added as **A** record for in DNS editor for both **@** and **\***. It helped pointing all subdomains of the primary domain to this AWS EC2 instance.

Later, in EC2 instance, nginx was installed. Two virtual host files were created for frontend and backend application. Each file created a reverse proxy to the docker containers running the application.


```
server {
    listen 80;
    listen [::]:80;

    server_name frontend.hasnatnayeem.com;

    location ~ / {
            proxy_pass http://127.0.0.1:4200;
    }
}
````

```
server {
  listen 80;
  listen [::]:80;
  server_name backend.hasnatnayeem.com;

  location / {
      proxy_pass http://127.0.0.1:3000/;
  }
}
```

There was an issue with service static files of the swagger documentation. That is why a separate docker container was run with **swagger.json** file of the backend project. The third reverse proxy was created to point to this container.

```
server {
  listen 80;
  listen [::]:80;
  server_name swagger.hasnatnayeem.com;

  location / {
      proxy_pass http://127.0.0.1:3001/;
  }
}
```