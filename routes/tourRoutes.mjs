import express from 'express';
import {
  getAllTours,
  getATour,
  createATour,
  updateATour,
  deleteATour,
} from '../controllers/tourController.mjs';

const router = express.Router();

// checkBody middleware

//param middleware
// router.param('id', checkID);

router.route('/').get(getAllTours).post(createATour);
router.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

export default router;
