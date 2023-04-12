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
