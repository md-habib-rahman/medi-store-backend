import express from 'express'
import { auth, UserRole } from '../../middlewares/auth';
import { categoryController } from './category.controller';

const router = express.Router()

router.post('/categories', auth(UserRole.ADMIN), categoryController.createCategory)
router.get('/categories', auth(UserRole.ADMIN), categoryController.createCategory)

export const categoryRouter = router;