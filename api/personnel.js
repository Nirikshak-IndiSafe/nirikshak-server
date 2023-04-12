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
        check('dob', 'Date of Birth is required').not().isEmpty(),
        check('admin', 'IsAdmin is required').not().isEmpty().isBoolean(),
        check('batch', 'Batch Number is required')
            .not()
            .isEmpty()
            .isAlphanumeric(),
        // check('station', 'Please include a valid Station Id').not().isEmpty(),
    ],
    register
);

router.post('/login', [
    check('id_number', 'Id number is required').not().isEmpty(),
    check('password', 'Password not valid ').not().isEmpty().isLength({
        min: 8
    })
]
    , login)

export default router;
