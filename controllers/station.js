import { Station } from '../models/index.js';

export const createStation = async (req, res) => {
    try {
        const docs = await Station.create({
            ...req.body
        });
        return res.status(201).json({
            message: 'Station id - ' + docs._id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const deleteStation = async (req, res) => {
    try {
        const { id } = req.params;
        await Station.findByIdAndUpdate(id, {
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

export const updateStation = async (req, res) => {
    try {
        const { _id, name, address, location } = req.body;
        await Station.findByIdAndUpdate(_id, {$set: { name, address, location }});
        return res.status(200).json({
            message: 'Event updated',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const getStation = async (req, res) => {
    try {
        const id  = req.params.id;
        const data = await Station.findById(id);
        return res.status(200).json({
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
