import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../models/userModel.js";
import { registerCtrl } from "../controllers/authControllers.js";

export const authRouter = express.Router();

// register or signup
authRouter.post("/register", validateBody(registerSchema), registerCtrl);
