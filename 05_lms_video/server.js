import mongoose from "mongoose";
import app from "./app.js";
import { error } from "console";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log("Server is running"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
