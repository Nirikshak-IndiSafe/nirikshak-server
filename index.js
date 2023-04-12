import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { PORT } from './config/constants.js';
import { connectDb } from './utils/index.js';
import { personnelRoutes } from './api/index.js';

const main = async () => {
    try {
        const app = express();

        await connectDb();

        app.use(cors({ origin: '*' }))
        app.use(json());
        app.use(urlencoded({ extended: false }));

        // Routes
        app.use("/api/personnel", personnelRoutes)

        app.listen(PORT, () => {
            console.log(`Listening to port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
};

main();
