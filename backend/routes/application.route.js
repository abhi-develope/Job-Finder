import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { applyJobs, getApplicant, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.get('/applyJobs/:id',isAuthenticated, applyJobs)
router.get('/getJobs',isAuthenticated, getAppliedJobs)
router.get('/:id/getApplicant',isAuthenticated, getApplicant)
router.post('/status/:id/update',isAuthenticated, updateStatus)


export default router;