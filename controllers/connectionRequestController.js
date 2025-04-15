import { createConnectionRequest, getConnectionRequestsByOwner } from '../models/connectionRequestModel.js';

export const createConnectionRequestCtrl = (req, res) => {
  const { requester_id, owner_id, hobby_id } = req.body;
  if (!requester_id || !owner_id || !hobby_id) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  createConnectionRequest({ requester_id, owner_id, hobby_id }, (err, result) => {
    if (err) {
      console.error('Error creating connection request:', err);
      return res.status(500).json({ message: 'Server error, unable to create connection request.' });
    }
    res.status(201).json({ message: 'Connection request sent successfully', request_id: result.insertId });
  });
};

export const getConnectionRequestsCtrl = (req, res) => {
  const { owner_id } = req.params;
  getConnectionRequestsByOwner(owner_id, (err, results) => {
    if (err) {
      console.error('Error fetching connection requests:', err);
      return res.status(500).json({ message: 'Server error, unable to fetch connection requests.' });
    }
    res.status(200).json(results);
  });
};
