import moment from 'moment';
import { Event, Personnel } from '../models/index.js';
import { Types } from 'mongoose';
import PersonnelEvent from '../models/PersonnelEvent.js';

export const createEvent = async (req, res) => {
    try {
        const { name, start, end, latitude, longitude, radius } = req.body;
        const location = {
            type: 'Point',
            coordinates: [latitude, longitude],
        };
        await Event.create({
            name,
            start,
            end,
            location,
            radius,
        });
        return res.status(201).json({
            message: 'Event created',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.body;
        await Event.findByIdAndUpdate(id, {
            $set: {
                deleted: true,
            },
        });
        return res.status(204).json({
            message: 'Event deleted',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id, name, start, end, latitude, longitude, radius } = req.body;
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const getActiveEvents = async (req, res) => {
    try {
        const events = await Event.find({
            start: {
                $gte: moment().startOf('day').toDate(),
                $lte: moment().startOf('day').add(7, 'day').toDate(),
            },
            deleted: false,
        });
        console.log(events);

        return res.status(200).json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const _getEvent = async (id) => {
    const event = await Event.findById(id);
    return event;
};

export const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('personnels');
        return res.status(200).json({
            event,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const addPersonnel = async (req, res) => {
    try {
        let { eventId, personnels } = req.body;
        let event = await _getEvent(eventId);
        let nonAvailablePersonnels = await PersonnelEvent.find();
        nonAvailablePersonnels = nonAvailablePersonnels.map((personelEvent) =>
            personelEvent.personnel.toString()
        );
        console.log(nonAvailablePersonnels);
        personnels = personnels.filter(
            (personnel) => !nonAvailablePersonnels.includes(personnel)
        );
        console.log(personnels);
        let newPersonnels = personnels.concat(
            event.personnels.map((personnel) => personnel.toString())
        );
        newPersonnels = Array.from(new Set(newPersonnels)).map(
            (personnel) => new Types.ObjectId(personnel)
        );

        event = await Event.findByIdAndUpdate(eventId, {
            $set: {
                personnels: newPersonnels,
            },
        });
        await PersonnelEvent.insertMany(
            personnels.map((personnel) => {
                const data = {
                    personnel: new Types.ObjectId(personnel),
                    event: new Types.ObjectId(eventId),
                };
                return data;
            })
        );
        return res.status(200).json({
            message: 'Personnels Added',
            event: event,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const removePersonnel = async (req, res) => {
    try {
        const { eventId, personnels } = req.body;
        let event = await _getEvent(eventId);
        let nonAvailablePersonnels = await PersonnelEvent.find();
        nonAvailablePersonnels = nonAvailablePersonnels.map((personelEvent) =>
            personelEvent.personnel.toString()
        );
        let newPersonnels = event.personnels.map((personnel) =>
            personnel.toString()
        );
        console.log(nonAvailablePersonnels);

        let removedPersonnels = nonAvailablePersonnels
            .filter((personnel) => personnels.includes(personnel))
            .filter((personnel) => newPersonnels.includes(personnel));
        newPersonnels = newPersonnels.filter(
            (personnel) => !personnels.includes(personnel)
        );
        newPersonnels = Array.from(new Set(newPersonnels)).map(
            (personnel) => new Types.ObjectId(personnel)
        );
        console.log(removedPersonnels);
        console.log(newPersonnels);

        await PersonnelEvent.deleteMany({
            personnel: { $in: removedPersonnels },
        });

        const newEvent = await Event.findByIdAndUpdate(eventId, {
            $set: {
                personnels: newPersonnels,
            },
        });
        return res.status(200).json({
            message: 'Personnels Removed',
            event: newEvent,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
