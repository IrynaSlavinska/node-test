import { Router } from "express";

import userController from "../controllers/userController.js";
import {
  checkUserID,
  checkCreateUserData,
  checkUpdateUserData,
} from "../middlewares/userMiddleware.js";

const router = Router();

router
  .route("/")
  .post(checkCreateUserData, userController.createUser)
  .get(userController.getUsersList);

router.use("/:userID", checkUserID);
router
  .route("/:userID")
  .get(userController.getOneUser)
  .patch(checkUpdateUserData, userController.updateUser)
  .delete(userController.deleteUser);

export default router;
