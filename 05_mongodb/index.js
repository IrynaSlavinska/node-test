import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRouter from "./routes/userRoutes.js";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./envs/production.env"
      : "./envs/development.env",
});

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  // .connect(serverConfig.mongoUrl)
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// MIDDLEWARES ==========================================
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// app.use(morgan('dev'));

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("Hello from middleware!!!");

  req.time = new Date().toLocaleString("uk-UA");

  next();
});

// ROUTES ==========================================
const pathPrefix = "/api/v1";

// CONTROLLERS ==========================================
app.use(`${pathPrefix}/users`, userRouter);

// handlenot found error
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Ooops! Resource not found!",
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.log(`Error ${err.message}`);
  // console.log(err);
  res.status(err.status ?? 500).json({
    message: err.message,
  });
});

// SERVER INIT ===========================================
const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
