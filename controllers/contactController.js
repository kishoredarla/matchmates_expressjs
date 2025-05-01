import {
    createContactMessage,
    getAllContactMessages
  } from '../models/contactModel.js';
  
  export const createContactCtrl = (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }
    createContactMessage({ name, email, subject, message }, (err, result) => {
      if (err) {
        console.error('Error saving contact message:', err);
        return res.status(500).json({ message: 'Server error, please try again.' });
      }
      res.status(201).json({ message: 'Your message has been received. Thank you!' });
    });
  };
  
  export const getContactsCtrl = (req, res) => {
    getAllContactMessages((err, results) => {
      if (err) {
        console.error('Error fetching contact messages:', err);
        return res.status(500).json({ message: 'Server error.' });
      }
      res.json(results);
    });
  };
  