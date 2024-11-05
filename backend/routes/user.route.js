import express from 'express'
import { login, logout, profileUpdate, signup } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/profile-update',isAuthenticated, profileUpdate)

export default router;