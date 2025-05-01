import express from 'express';
import {
  createContactCtrl,
  getContactsCtrl
} from '../controllers/contactController.js';

const router = express.Router();

// Public: submit a message
router.post('/create', createContactCtrl);

// Admin: list all messages
router.get('/', getContactsCtrl);

export default router;
