import { Router } from 'express';
import {
    getPersonnel,
    getPersonnelById,
    login,
    register,
} from '../controllers/personnel.js';
import { check } from 'express-validator';
const router = Router();

router.get('/', getPersonnel);
router.get('/:id', getPersonnelById);
router.post(
    '/register',
    [
        check('firstName', 'First Name is required').not().isEmpty(),
        check('lastName', 'Last Name is required').not().isEmpty(),
        check('admin', 'IsAdmin is required').not().isEmpty().isBoolean(),
        check('batch', 'Batch Number is required')
            .not()
            .isEmpty()
            .isAlphanumeric(),
        check('station', 'Please include a valid Station Id').not().isEmpty(),
    ],
    register
);
router.post('/login', login);

export default router;
