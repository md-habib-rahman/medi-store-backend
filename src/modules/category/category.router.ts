import express from 'express'
import { auth, UserRole } from '../../middlewares/auth';
import { categoryController } from './category.controller';

const router = express.Router()
router.get('/all', categoryController.allCategoryWithoutPagination)
router.post('/', auth(UserRole.ADMIN), categoryController.createCategory)
router.get('/', categoryController.getAllCategory)
router.delete('/:id', auth(UserRole.ADMIN), categoryController.deleteCategory)

export const categoryRouter = router;