import { Express } from 'express';
import router from './router/router';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use('/api', router);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
