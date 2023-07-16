import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./app/routes/index.routes.js";

const app = express();
dotenv.config();

// Middlewares
app.use(morgan("dev")); // HTTP request logging during development
app.use(express.json()); // Parsing incoming JSON payloads
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded form data

// Routes
app.use("/api", router); // Mounting router middleware at the "/api" base URL
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode link ${
      process.env.NODE_ENV === "production"
        ? process.env.PROD_URL
        : process.env.DEV_URL
    }`
  );
});
