import {
    createEventRequest,
    getRequestsForOwner,
    updateRequestStatus
  } from '../models/eventRequestsModel.js';
  
  export const createEventRequestCtrl = (req, res) => {
    const { event_id, requester_id } = req.body;
    if (!event_id || !requester_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    createEventRequest({ event_id, requester_id }, (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.status(201).json({ message: 'Request sent', request_id: result.insertId });
    });
  };
  
  export const getRequestsForOwnerCtrl = (req, res) => {
    const owner_id = req.params.owner_id;
    getRequestsForOwner(owner_id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    });
  };
  
  export const updateRequestStatusCtrl = (req, res) => {
    const request_id = req.params.request_id;
    const { status } = req.body;
    if (!['accepted','declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    updateRequestStatus(request_id, status, (err) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json({ message: 'Request updated' });
    });
  };
  