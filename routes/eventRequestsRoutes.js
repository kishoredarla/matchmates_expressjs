import express from 'express';
import {
  createEventRequestCtrl,
  getRequestsForOwnerCtrl,
  updateRequestStatusCtrl
} from '../controllers/eventRequestsController.js';

const router = express.Router();

router.post('/', createEventRequestCtrl);
router.get('/owner/:owner_id', getRequestsForOwnerCtrl);
router.put('/:request_id', updateRequestStatusCtrl);

export default router;
