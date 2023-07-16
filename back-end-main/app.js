import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./app/routes/index.routes.js";

const app = express();
dotenv.config();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", router);
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
