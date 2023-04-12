import express from 'express';
import { PORT } from './config/constants.js';

const main = () => {
    const app = express();

    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    });
};

main();
