import { Event, Personnel } from '../models/index.js';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { idNumberGen } from '../utils/psuedoNumber.js';
import PersonnelEvent from '../models/PersonnelEvent.js';

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });

    const { firstName, lastName, dob, admin, batch, station } = req.body;

    try {
        const personnelData = {
            firstName,
            lastName,
            dob: new Date(),
            admin,
            batch,
            id_number: idNumberGen(),
            password: `${firstName[0]}${lastName[0]}ip@123`,
            station: new Types.ObjectId(station),
        };
        await Personnel.create({
            ...personnelData,
        });
        return res.status(200).json({
            message: 'Personnel Created',
            creds: {
                id: personnelData.id_number,
                password: personnelData.password,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });

    const { id_number, password } = req.body;

    try {
        const user = await Personnel.findOne({
            id_number,
        });

        if (!user || user.password != password) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid Id Number or Password',
                    },
                ],
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export const getPersonnel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });

    try {
        const personnels = await Personnel.find();
        return res.status(200).json(personnels);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const _getPersonnel = async (id) => {
    const personnel = await Personnel.findById(id).populate('station');
    return personnel;
};

export const getPersonnelById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });

    const { id } = req.params;

    try {
        const personnel = await _getPersonnel(id);
        if (!personnel)
            return res.status(404).json({
                message: 'Personnel Not Found',
            });
        return res.status(200).json(personnel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export const getDetailedPersonnelById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { id } = req.params;
    try {
        const personnel = await _getPersonnel(id);
        const personnelEvent = await PersonnelEvent.find({
            personnel: new Types.ObjectId(id),
        });
        const personnelEvents = await Event.find({
            personnels: id,
        });
        return res.status(200).json({
            personnel,
            all_events: personnelEvents,
            current_event: personnelEvent,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
