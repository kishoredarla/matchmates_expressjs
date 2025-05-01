import express from 'express';
import {
  getAllEventsCtrl,
  getMyEventsCtrl,
  createEventCtrl
} from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', getAllEventsCtrl);
router.get('/user/:user_id', getMyEventsCtrl);
router.post('/create', createEventCtrl);

export default router;
