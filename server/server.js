import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";
import userAuthRouter from "./routes/userAuthRoutes.js";
import adminRouter from "./routes/adminAuthRoutes.js";
import cookieParser from "cookie-parser";

const PORT = 4000 || process.env.PORT;

var app = express();

const allowedOrigins = ["https://video-library-demo.netlify.app/"];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.json("Api is Working");
});

app.use("/api/user", userAuthRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`The server is running on Port: ${PORT}`);
});
