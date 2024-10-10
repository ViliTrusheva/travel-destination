## Travel Destination project

## Figma Design

You can view the Figma prototype <a href="https://www.figma.com/design/CcbkZ3X8qdqRTn1q9cL8c9/Travel-Destination-Project?node-id=0-1&t=vSczKiC8VEynPsZE-1" target="_blank">here</a>. 

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
