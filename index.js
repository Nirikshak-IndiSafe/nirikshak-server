import express, { json, urlencoded } from 'express';
import { PORT } from './config/constants.js';
import { connectDb } from './utils/index.js';

const main = async () => {
    try {
        const app = express();

        await connectDb();

        app.use(json());
        app.use(urlencoded({ extended: false }));

        // Routes

        app.listen(PORT, () => {
            console.log(`Listening to port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
};

main();
