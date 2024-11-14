import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { applyJobs, getApplicant, getAppliedJobs } from '../controllers/application.controller.js';

const router = express.Router();

router.get('/applyJobs/:id',isAuthenticated, applyJobs)
router.get('/getApplied',isAuthenticated, getAppliedJobs)
router.get('/:id/getApplicant',isAuthenticated, getApplicant)
router.get('/status/:id/update',isAuthenticated, getApplicant)


export default router;