import { Personnel } from '../models/index.js'
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongoose'

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });


    const { firstName, lastName, dob, admin, batch, station } = req.body;

    try {
        const personnelData = {
            firstName, lastName, dob: new Date(dob), admin, batch, station: ObjectId(station)
        }

        await Personnel.create({
            ...personnelData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).join({
            message: "Internal Server Error"
        })
    }
}


export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });

    try {


    } catch (error) {
        console.error(error);
        return res.status(500).join({
            message: "Internal Server Error"
        })
    }
}


export const getPersonnel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });

    try {

    } catch (error) {
        console.error(error);
        return res.status(500).join({
            message: "Internal Server Error"
        })
    }
}


export const getPersonnelById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            errors: errors.array(),
        });


    try {

    } catch (error) {
        console.error(error);
        return res.status(500).join({
            message: "Internal Server Error"
        })
    }
}