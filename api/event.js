import { Router } from 'express';
import {
    createEvent,
    deleteEvent,
    updateEvent,
    getActiveEvents,
    getEvent,
} from '../controllers/event.js';

const router = Router();

router.post('/create', createEvent);
router.delete('/delete', deleteEvent);
router.get('/active-events', getActiveEvents);

export default router;
