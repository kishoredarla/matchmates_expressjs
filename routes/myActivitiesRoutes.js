
import express from 'express';
import { getMyActivitiesCtrl } from '../controllers/myActivitiesController.js';

const router = express.Router();

// GET all activities for the logged-in user
router.get('/:user_id', getMyActivitiesCtrl);

export default router;
