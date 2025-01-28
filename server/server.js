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
const allowedOrigins = ["https://video-library-demo.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);

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
