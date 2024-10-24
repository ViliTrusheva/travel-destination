# Travel Destination project

## Figma Design

You can view the Figma prototype <a href="https://www.figma.com/design/CcbkZ3X8qdqRTn1q9cL8c9/Travel-Destination-Project?node-id=0-1&t=vSczKiC8VEynPsZE-1" target="_blank">here</a>. 

## Features
- Backend built with Node.js, Express, and MongoDB.
- Frontend served using Nginx.
- Dockerized containers for the frontend, backend, and MongoDB database.
- Docker Compose for managing multi-container setup.
- CRUD operations for travel destinations.
- User authentication for login/signup.

## API Routes for Testing in Postman

By default, the server listens on **port 3000**.

### Endpoints:

#### **GET**:
- **Users**: `GET http://localhost:3000/users`
- **Travels**: `GET http://localhost:3000/travels`

#### **DELETE**:
- **Delete a User**: `DELETE http://localhost:3000/users/:userId`
- **Delete a Travel**: `DELETE http://localhost:3000/auth/travel/:travelId`

#### **PUT** (Update):
- **Update User Password**: `PUT http://localhost:3000/auth/password`
- **Update Travel**: `PUT http://localhost:3000/auth/travel/:travelId`

#### **POST**:
- **Create Travel**: `POST http://localhost:3000/auth/travel`
- **Login**: `POST http://localhost:3000/auth/login`
- **Register**: `POST http://localhost:3000/auth/register`

### Authentication Required:
- **Creating, updating, and deleting a travel**
- **Updating a user's password**
- **Deleting a travel**

To perform these actions, you'll need a **Bearer Token**:
1. Log in using the `/auth/login` endpoint.
2. Copy the token from the response.
3. In Postman, go to the **Authorization** tab, select **Bearer Token**, and paste the token.



## Docker setup

### Prerequisities

Before you begin, ensure you the following installed 

- [Docker] (https://www.docker.com/get-started)
- [Docker-Compose] (https://docs.docker.com/compose/install/)

To verify the installations, run the following commands in the terminal:

``` bash
docker --version
docker-compose --version
```

## Containerization Process

1. **Backend**: Create a dockerfile in the backend folder.
2. **Frontend**: Create a dockerfile in the frontend folder.
3. **Docker Compose**: Create a docker-compose.yml file in the root directory.
   
### Build and Run the Containers

1. **Navigate to the Project Root**:
   Open a terminal and navigate to the root directory where the `docker-compose.yml` file is located:
``` bash
cd path/to/project-root
```

2. **Stop Any Running Containers**:
   If you have any running containers, stop them first:
``` bash
docker-compose down
```

3. **Build Containers**:
   Use the following command to build and start the containers:
``` bash
docker-compose up --build -d
```

### Troubleshooting
If you encounter any issues during the build process on the client side, check the Docker logs for errors:
``` bash
cd path/to/frontend-folder
docker logs frontend
```

If you encounter any issues during the build process on the server side, check the Docker logs for errors:
``` bash
cd path/to/backend-folder
docker logs backend
```

### Stopping the Container
To stop the container:
``` bash
docker-compose down
```

This `README.md` provides an overview of the project, instructions for setup, and details of the Docker environment.
