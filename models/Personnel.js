import { Schema, model } from 'mongoose';
import Station from './Station.js';

const PersonnelSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    id_number: {
        type: Number,
        required: true,
        unique: true,
    },
    batch: {
        type: Number,
        required: true,
    },
    station: {
        type: Schema.Types.ObjectId,
        ref: Station,
    },
});

const Personnel = model('Personnel', PersonnelSchema);

export default Personnel;
