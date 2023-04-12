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
    },
    end: {
        type: Date,
        required: true,
    },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number],
    },
    personnels: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: Personnel,
            },
        ],
    },
});

const Event = model('Event', eventSchema);

export default Event;
