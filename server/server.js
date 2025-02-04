import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";
import userAuthRouter from "./routes/userAuthRoutes.js";
import adminRouter from "./routes/adminAuthRoutes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 4000; // Fix: Use process.env.PORT first, fallback to 4000

const app = express();

// Define allowed origins (remove trailing slash)
const allowedOrigins = [
  "https://video-library-demo.netlify.app",
  "http://localhost:5173",
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.json("API is Working");
});

app.use("/api/user", userAuthRouter);
app.use("/api/admin", adminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`The server is running on Port: ${PORT}`);
});
