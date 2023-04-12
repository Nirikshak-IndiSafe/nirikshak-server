import { Schema, model } from 'mongoose';
import Event from './Event.js';
import Personnel from './Personnel.js';

const PersonnelEventSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: Event,
    },
    personnel: {
        type: Schema.Types.ObjectId,
        ref: Personnel,
        unique: true,
    },
});

const PersonnelEvent = model('PersonnelEvent', PersonnelEventSchema);

export default PersonnelEvent;
