import { Router } from 'express';
import {
    createStation,
    deleteStation,
    updateStation,
    getStation,
    getStations,
} from '../controllers/station.js';

const router = Router();

router.post('/create', createStation);
router.get('/:id', getStation);
router.get('/all/stations', getStations);
router.delete('/:id', deleteStation);
router.put('/update', updateStation);

export default router;
