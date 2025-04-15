
import { db } from '../config/dbConfig.js';
import { execQuery } from '../utils/dbUtil.js';

export const getMyActivitiesModel = (userId, callback) => {
  const sql = `SELECT * FROM user_hobbies WHERE user_id = ? ORDER BY date DESC`;
  execQuery(db, sql, [userId], callback);
};
