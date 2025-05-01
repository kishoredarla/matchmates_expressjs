import { db } from '../config/dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

export const createEventRequest = (data, callback) => {
  const { event_id, requester_id } = data;
  const sql = `INSERT INTO event_requests (event_id, requester_id) VALUES (?, ?)`;
  execQuery(db, sql, [event_id, requester_id], callback);
};

export const getRequestsForOwner = (owner_id, callback) => {
  const sql = `
    SELECT er.request_id, er.status, er.created_at,
           e.event_id, e.title, e.start_date, e.end_date,
           u.user_id AS requester_id, u.user_name AS requester_name
    FROM event_requests er
    JOIN events e ON er.event_id = e.event_id
    JOIN user u ON er.requester_id = u.user_id
    WHERE e.user_id = ?
    ORDER BY er.created_at DESC
  `;
  execQuery(db, sql, [owner_id], callback);
};

export const updateRequestStatus = (request_id, status, callback) => {
  const sql = `UPDATE event_requests SET status = ? WHERE request_id = ?`;
  execQuery(db, sql, [status, request_id], callback);
};
