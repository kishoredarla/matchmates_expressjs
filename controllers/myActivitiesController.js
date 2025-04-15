
import { getMyActivitiesModel } from '../models/myActivitiesModel.js';

export const getMyActivitiesCtrl = (req, res) => {
  const userId = req.params.user_id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  getMyActivitiesModel(userId, (err, results) => {
    if (err) {
      console.error("Error fetching activities:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(200).json(results);
  });
};
