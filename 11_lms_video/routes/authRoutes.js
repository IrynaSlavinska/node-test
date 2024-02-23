import express from "express";
import {
  loginSchema,
  registerSchema,
  emailSchema,
} from "../models/userModel.js";
import {
  registerCtrl,
  verifyEmailCtrl,
  resendVerifyEmailCtrl,
  loginCtrl,
  getCurrent,
  logoutCtrl,
  updateAvatarCtrl,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

export const authRouter = express.Router();

// register or signup
authRouter.post("/register", validateBody(registerSchema), registerCtrl);

authRouter.get("/verify/:verificationToken", verifyEmailCtrl);
authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmailCtrl);

// login or sigin
authRouter.post("/login", validateBody(loginSchema), loginCtrl);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logoutCtrl);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarCtrl
);
