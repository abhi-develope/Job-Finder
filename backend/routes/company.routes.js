import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router.post('/registerCompany',isAuthenticated, registerCompany)
router.get('/getCompany',isAuthenticated, getCompany)
router.get('/getCompanyById/:id',isAuthenticated, getCompanyById)
router.put('/updateCompany',isAuthenticated, updateCompany)

export default router;