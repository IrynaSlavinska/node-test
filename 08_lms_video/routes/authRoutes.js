import express from "express";
import { loginSchema, registerSchema } from "../models/userModel.js";
import {
  registerCtrl,
  loginCtrl,
  getCurrent,
  logoutCtrl,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";

export const authRouter = express.Router();

// register or signup
authRouter.post("/register", validateBody(registerSchema), registerCtrl);
// login or sigin
authRouter.post("/login", validateBody(loginSchema), loginCtrl);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logoutCtrl);
