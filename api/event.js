import { Router } from 'express';
import {
    createEvent,
    deleteEvent,
    updateEvent,
    getActiveEvents,
    getEvent,
    addPersonnel,
    removePersonnel,
} from '../controllers/event.js';

const router = Router();

router.post('/create', createEvent);
router.delete('/delete', deleteEvent);
router.get('/active-events', getActiveEvents);
router.put('/add-personnel', addPersonnel);
router.put('/remove-personnel', removePersonnel);

export default router;
