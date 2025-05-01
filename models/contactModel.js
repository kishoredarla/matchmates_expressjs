import { db } from '../config/dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

export const createContactMessage = (data, callback) => {
  const { name, email, subject, message } = data;
  const sql = `
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  execQuery(db, sql, [name, email, subject, message], callback);
};

export const getAllContactMessages = (callback) => {
  const sql = `
    SELECT message_id, name, email, subject, message, created_at
    FROM contact_messages
    ORDER BY created_at DESC
  `;
  execQuery(db, sql, [], callback);
};
