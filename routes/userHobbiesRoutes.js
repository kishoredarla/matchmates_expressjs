import express from 'express';
import { getUserHobbies, createUserHobby } from '../controllers/userHobbiesController.js';

const router = express.Router();

router.get('/', getUserHobbies);
router.post('/create', createUserHobby);

export default router;
