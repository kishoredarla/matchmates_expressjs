import { loginMdl, createUserMdl,getUserById,
  updateUser,
  deleteUser,
  changePassword } from '../models/authenticationModel.js';
import express from "express";
import Jwt from 'jsonwebtoken';

const app = express();

export const LoginAppCtrl = function (req, res) {
    const { userEmail, Password } = req.body;
  
    loginMdl({ userEmail }, function (err, results) {
      if (err) {
        console.error('Error during login:', err);  // Added logging for debugging
        return res.status(400).json({ status: 400, message: "Not able to process the request, please try again" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ status: 404, message: "Email not found" });
      }
  
      const user = results[0];
      const validPass = (Password === user.password);
  
      if (validPass) {
        const SecretKey = process.env.SecretKey;
        if (!SecretKey) {
          return res.status(500).json({ status: 500, message: "Internal server error: SecretKey not defined" });
        }
  
        const payload = { subject: userEmail };
        const token = Jwt.sign(payload, SecretKey, { expiresIn: "3h" });
  
        return res.status(200).json({
          status: 200,
          message: "Login successful",
          results: [user],
          token
        });
      } else {
        return res.status(400).json({ status: 400, message: "Invalid password" });
      }
    });
  };


export const createUserCtrl = (req, res) => {
    const userData = req.body;
    createUserMdl(userData, (err, results) => {
        if (err) {
            if (err.message === "Email already exists") {
                return res.status(400).json({ status: 400, message: "Email already exists" });
            } else if (err.message === "Username already exists") {
                return res.status(400).json({ status: 400, message: "Username already exists" });
            } else {
                return res.status(500).json({ status: 500, message: "Internal server error" });
            }
        } else {
            return res.status(201).json({ status: 201, message: "User registered successfully" });
        }
    });
};

export const handleGetUser = (req, res) => {
  getUserById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to retrieve user' });
    if (!result.length) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(result[0]);
  });
};

export const handleUpdateUser = (req, res) => {
  updateUser(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to update profile' });
    res.status(200).json({ message: 'Profile updated successfully' });
  });
};

export const handleDeleteUser = (req, res) => {
  deleteUser(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete user' });
    res.status(200).json({ message: 'User account deleted successfully' });
  });
};

export const handleChangePassword = (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ message: 'New password is required' });

  changePassword(req.params.id, newPassword, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to change password' });
    res.status(200).json({ message: 'Password changed successfully' });
  });
};

