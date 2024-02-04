import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

import booksRouter from "./routes/booksRouter.js";
import { authRouter } from "./routes/authRoutes.js";

dotenv.config();
export const app = express();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// hash passwod example
// const createHashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   // console.log(salt);
//   // const result = await bcrypt.hash(password, salt)
//   const result = await bcrypt.hash(password, 10);
//   // console.log(result);

//   const compareResult1 = await bcrypt.compare(password, result);
//   console.log(compareResult1);
//   const compareResult2 = await bcrypt.compare("123457", result);
//   console.log(compareResult2);
// };

// createHashPassword("123456");

// login token
// const { SECRET_KEY } = process.env;
// const payload = {
//   id: "65bfb5100fccebc6b6c86fec",
// };
// // в jwt.sign передаємо дані користувача(айді), секретний ключ і час життя токену
// const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
// // console.log(token);
// const decodeToken = jwt.decode(token);
// // console.log(decodeToken);
// try {
//   const { id } = jwt.verify(token, SECRET_KEY);
// } catch (error) {
//   console.log(error);
// }
