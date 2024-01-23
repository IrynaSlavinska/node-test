import { Router } from 'express';

import userController from '../controllers/userController.js';
import checkUserID from '../middlewares/userMiddleware.js';

const router = Router();

/**
 * HTTP methods ==========================================
 * POST, GET, PUT, PATCH, DELETE
 *
 * REST API (CRUD operations)
 * POST         /users              - user creation
 * GET          /users              - get users list
 * GET          /users//<userUD>    - get one user
 * PATCH (PUT)  /users//<userUD>    - update one user
 * DELETE       /users//<userUD>    - remove one user
 */

// router.post('/', userController.createUser);
// router.get('/', userController.getUsersList);
// router.get('/:userID', checkUserID, userController.getOneUser);
// router.patch("/:userID", checkUserID, userController.updateUser);
// router.delete("/:userID", checkUserID, userController.deleteUser);

router
  .route('/')
  .post(userController.createUser)
  .get(userController.getUsersList);

router.use('/:userID', checkUserID);
router
  .route('/:userID')
  .get(userController.getOneUser)
  .patch(userController.getOneUser)
  .delete(userController.getOneUser);

export default router;
