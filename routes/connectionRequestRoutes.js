// connectionRequestRoutes.js
import express from 'express';
import { createConnectionRequestCtrl, getConnectionRequestsCtrl } from '../controllers/connectionRequestController.js';

const router = express.Router();

// POST: Create a new connection request
router.post('/', createConnectionRequestCtrl);

// GET: Get connection requests for an owner
router.get('/:owner_id', getConnectionRequestsCtrl);

export default router;
