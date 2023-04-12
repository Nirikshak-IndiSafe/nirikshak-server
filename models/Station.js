import { Schema, model } from 'mongoose';

const stationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: 'Point',
            coordinates: [Number],
        },
    },
});

const Station = model('Station', stationSchema);

export default Station;
