import { db } from '../config/dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

export const getAllEvents = (callback) => {
  const sql = `SELECT e.*, u.user_name 
               FROM events e 
               JOIN user u ON e.user_id = u.user_id
               ORDER BY start_date`;
  execQuery(db, sql, [], callback);
};

export const getEventsByUser = (userId, callback) => {
  const sql = `SELECT * FROM events WHERE user_id = ? ORDER BY start_date DESC`;
  execQuery(db, sql, [userId], callback);
};

export const createEvent = (data, callback) => {
  const { user_id, title, description, location, start_date, end_date } = data;
  const sql = `INSERT INTO events 
               (user_id, title, description, location, start_date, end_date) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  execQuery(db, sql, [user_id, title, description, location, start_date, end_date], callback);
};
