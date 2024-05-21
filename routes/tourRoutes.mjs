import express from 'express';
import {
  getAllTours,
  getATour,
  createATour,
  updateATour,
  deleteATour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} from '../controllers/tourController.mjs';

const router = express.Router();

// checkBody middleware

//param middleware
// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(getAllTours).post(createATour);
router.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

export default router;
