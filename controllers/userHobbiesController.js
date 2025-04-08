import { db } from '../config/dbConfig.js';

export const getUserHobbies = (req, res) => {
  const query = 'SELECT * FROM user_hobbies ORDER BY date DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching hobbies:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json(results);
  });
};

export const createUserHobby = (req, res) => {
  const { user_id, activity, location, date, description } = req.body;

  if (!user_id || !activity || !location || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    INSERT INTO user_hobbies (user_id, activity, location, date, description)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [user_id, activity, location, date, description];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error creating hobby:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Hobby created', id: result.insertId });
  });
};
