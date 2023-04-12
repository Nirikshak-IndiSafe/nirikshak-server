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
    dob: {
        type: Date,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
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
