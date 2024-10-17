import express from 'express'
import { login, profileUpdate, signup } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/profile-update',isAuthenticated, profileUpdate)

export default router;