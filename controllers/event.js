import { Event } from '../models/index.js';

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
        await Event.deleteOne({ $where: { id } });
    } catch (error) {
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
        const events = await Event.find({ $where: {} });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const getEvent = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
