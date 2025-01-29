Here’s the updated `README.md` with a more detailed project description at the beginning and without emojis:

---

# Technologies Video Library

## About the Project

Technologies Video Library is a **full-stack web application** designed to provide a seamless video browsing experience. It allows **users** to register, log in, and explore a categorized collection of videos. Additionally, it includes an **admin panel** where administrators can manage users, videos, and categories.

The project is built using the **MERN stack (MongoDB, Express.js, React, and Node.js)** with modern tools and frameworks to ensure a scalable and efficient application.

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

## Live Demo

[Video Library Demo](https://video-library-demo.netlify.app/)

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/RAJESH2132/Video-Library.git
cd Video-Library
```

### 2. Backend Setup

```sh
cd server
npm install
```

- Create a `.env` file in the `server` directory:
  ```
  MONGODB_URI=your-mongodb-connection-string
  USER_JWT_SECRET=your-user-jwt-secret
  ADMIN_JWT_SECRET=your-admin-jwt-secret
  NODE_ENV=development
  ```
- Start the backend:
  ```sh
  npm run dev
  ```

### 3. Frontend Setup

```sh
cd ../client
npm install
```

- Create a `.env` file in the `client` directory:
  ```
  VITE_BACKEND_URL=http://localhost:4000
  ```
- Start the frontend:
  ```sh
  npm run dev
  ```

## API Endpoints

### User Routes

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/user/register`       | Register a new user |
| POST   | `/api/user/login`          | Login a user        |
| GET    | `/api/user/get-videos`     | Get all videos      |
| GET    | `/api/user/get-categories` | Get all categories  |

### Admin Routes

| Method | Endpoint                      | Description       |
| ------ | ----------------------------- | ----------------- |
| POST   | `/api/admin/register`         | Register an admin |
| POST   | `/api/admin/add-video`        | Add a new video   |
| DELETE | `/api/admin/delete-video/:id` | Delete a video    |

## Contributing

Contributions are welcome! If you would like to contribute, feel free to submit a pull request.

Let me know if you'd like any further changes.
