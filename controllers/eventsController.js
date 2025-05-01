import {
    getAllEvents,
    getEventsByUser,
    createEvent
  } from '../models/eventsModel.js';
  
  export const getAllEventsCtrl = (req, res) => {
    getAllEvents((err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    });
  };
  
  export const getMyEventsCtrl = (req, res) => {
    const userId = req.params.user_id;
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    getEventsByUser(userId, (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    });
  };
  
  export const createEventCtrl = (req, res) => {
    const data = req.body;
    if (!data.user_id || !data.title || !data.start_date || !data.end_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    createEvent(data, (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.status(201).json({ message: 'Event created', event_id: result.insertId });
    });
  };
  