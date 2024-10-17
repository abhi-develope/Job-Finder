import express from 'express'
import { login, profileUpdate, signup } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/profile-update', profileUpdate)

export default router;