import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getAllJobs, jobApplication, jobsById } from '../controllers/job.controller.js';

const router = express.Router();

router.post('/postJobs',isAuthenticated, jobApplication)
router.get('/allJobs',isAuthenticated, getAllJobs)
router.get('/jobsById/:id',isAuthenticated, jobsById)
router.get('/getAdminJobs',isAuthenticated, adminJobs)

export default router;