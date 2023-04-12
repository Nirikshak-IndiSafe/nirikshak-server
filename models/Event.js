import { Schema, model } from 'mongoose';
import Personnel from './Personnel.js';

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
        default: new Date(),
    },
    end: {
        type: Date,
        required: true,
        default: new Date(),
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number],
    },
    radius: {
        type: Number,
        required: true,
    },
    personnels: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: Personnel,
            },
        ],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

const Event = model('Event', eventSchema);

export default Event;
