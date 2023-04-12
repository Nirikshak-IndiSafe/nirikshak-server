import { connect } from 'mongoose';
import { DB_URI } from '../config/constants.js';

const connectDb = async () => {
    try {
        await connect(DB_URI);
        console.log('Connected to the database');
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
};

export default connectDb;
