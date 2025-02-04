# Technologies Video Library

## Table of Contents

1. [About the Project](#about-the-project)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Live Demo](#live-demo)
5. [Access the Application](#access-the-application)
6. [Installation & Setup](#installation--setup)
   - [Clone the Repository](#1-clone-the-repository)
   - [Create .env Files](#2-create-env-files)
   - [Docker Setup](#3-docker-setup)
   - [Backend Setup (Without Docker)](#4-backend-setup-without-docker)
   - [Frontend Setup (Without Docker)](#5-frontend-setup-without-docker)
7. [API Endpoints](#api-endpoints)
   - [Admin Routes](#admin-routes)
   - [User Routes](#user-routes)
8. [Contributing](#contributing)

---

## About the Project

Technologies Video Library is a **full-stack web application** designed to provide a seamless and efficient **one-stop platform** for exploring technology-related videos. Users can easily register, log in, and browse a **curated collection of videos** organized into specific categories. The videos are embedded directly from **YouTube**, ensuring smooth playback without the need for storing video files on the server.

Additionally, the app features an **admin panel** where administrators can manage users, videos, and categories.

This project is built using the **MERN stack (MongoDB, Express.js, React, and Node.js)**, and it also integrates **Docker** for easy containerization, allowing you to quickly set up and deploy the application in isolated environments. With Docker, you can ensure consistent development, testing, and production environments, making it easier to manage dependencies and deployment.

The application supports both **local setup** and **Dockerized setup**, giving flexibility for various use cases. The Dockerized version contains everything you need to run the application, including the frontend, backend, and MongoDB database.

---

## Tech Stack

### Frontend (Client)

- **React 19** – UI development
- **React Router 7** – Routing management
- **Axios** – API calls
- **Tailwind CSS 4** – Styling
- **React Toastify** – Notifications
- **Vite** – Build tool for optimized performance

### Backend (Server)

- **Node.js & Express.js** – Backend framework
- **MongoDB & Mongoose** – NoSQL database for storing users, videos, and categories
- **JSON Web Tokens (JWT)** – Secure authentication for users and admins
- **bcryptjs** – Password encryption for user security
- **Joi** – Input validation to ensure data integrity
- **dotenv** – Environment variable management
- **Cors & Cookie-parser** – Security and session management

### Docker

- **Docker** – Containerization of both the client and server applications for easy setup and deployment.

---

## Features

### User Features

- User authentication with **JWT-based login & registration**
- Browse a collection of **categorized videos**
- **Filter videos by category**

### Admin Features

- **Admin authentication** for secure access
- **Add, edit, and delete** videos and categories
- **Manage users**
- View all **videos and users**

---

## Live Demo

[Video Library Demo](https://video-library-demo.netlify.app/)

---

## Access the Application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:4000](http://localhost:4000)

---

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/RAJESH2132/Video-Library.git
cd Video-Library
```

### 2. Create `.env` Files

Before setting up either Docker or the local environment, create the necessary `.env` files.

- **For the Backend:**

  - Navigate to the `server` directory and create a `.env` file with the following content:
    ```
    MONGODB_URI=your-mongodb-connection-string
    USER_JWT_SECRET=your-user-jwt-secret
    ADMIN_JWT_SECRET=your-admin-jwt-secret
    NODE_ENV=development
    ```

- **For the Frontend:**
  - Navigate to the `client` directory and create a `.env` file with the following content:
    ```
    VITE_BACKEND_URL=http://localhost:4000
    ```

### 3. Docker Setup

To run the application using Docker, follow these steps:

- **Build the Docker containers:**

  ```sh
  docker-compose build
  ```

- **Run the Docker containers:**
  ```sh
  docker-compose up
  ```

This will build and run both the backend and frontend services, along with a MongoDB container, inside isolated Docker environments.

### 4. Backend Setup (Without Docker)

If you prefer not to use Docker, you can set up the project locally.

```sh
cd server
npm install
```

- Create a `.env` file in the `server` directory (as mentioned above).
- Start the backend:
  ```sh
  npm run dev
  ```

### 5. Frontend Setup (Without Docker)

```sh
cd ../client
npm install
```

- Create a `.env` file in the `client` directory (as mentioned above).
- Start the frontend:
  ```sh
  npm run dev
  ```

---

## API Endpoints

### Admin Routes

| Method | Endpoint                                 | Description                     |
| ------ | ---------------------------------------- | ------------------------------- |
| POST   | `/api/admin/login`                       | Admin login                     |
| POST   | `/api/admin/logout`                      | Admin logout                    |
| GET    | `/api/admin/is-auth`                     | Check if admin is authenticated |
| POST   | `/api/admin/add-category`                | Add a new category              |
| POST   | `/api/admin/add-video`                   | Add a new video                 |
| GET    | `/api/admin/get-users`                   | Get all users                   |
| GET    | `/api/admin/get-user/:userId`            | Get user by ID                  |
| GET    | `/api/admin/get-videos`                  | Get all videos                  |
| GET    | `/api/admin/get-categories`              | Get all categories              |
| GET    | `/api/admin/get-video/:videoId`          | Get video by ID                 |
| GET    | `/api/admin/filter-videos/:categoryId`   | Filter videos by category       |
| DELETE | `/api/admin/delete-video/:videoId`       | Delete video by ID              |
| DELETE | `/api/admin/delete-category/:categoryId` | Delete category by ID           |
| PUT    | `/api/admin/edit-category/:categoryId`   | Edit category by ID             |
| PUT    | `/api/admin/edit-video/:videoId`         | Edit video by ID                |

### User Routes

| Method | Endpoint                              | Description                    |
| ------ | ------------------------------------- | ------------------------------ |
| POST   | `/api/user/register`                  | User registration              |
| POST   | `/api/user/login`                     | User login                     |
| POST   | `/api/user/logout`                    | User logout                    |
| GET    | `/api/user/is-auth`                   | Check if user is authenticated |
| GET    | `/api/user/get-videos`                | Get all videos                 |
| GET    | `/api/user/get-categories`            | Get all categories             |
| GET    | `/api/user/get-video/:videoId`        | Get video by ID                |
| GET    | `/api/user/filter-videos/:categoryId` | Filter videos by category      |

---

## Contributing

Contributions are welcome! If you would like to contribute, feel free to submit a pull request.
