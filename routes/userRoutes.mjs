import express from 'express';
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.mjs';

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);

export default router;
