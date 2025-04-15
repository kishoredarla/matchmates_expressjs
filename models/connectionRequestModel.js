// connectionRequestModel.js
import { db } from '../config/dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

export const createConnectionRequest = (data, callback) => {
  const { requester_id, owner_id, hobby_id } = data;
  const sql = `INSERT INTO connection_requests (requester_id, owner_id, hobby_id) VALUES (?, ?, ?)`;
  execQuery(db, sql, [requester_id, owner_id, hobby_id], callback);
};

export const getConnectionRequestsByOwner = (owner_id, callback) => {
  const sql = `SELECT * FROM connection_requests WHERE owner_id = ?`;
  execQuery(db, sql, [owner_id], callback);
};
