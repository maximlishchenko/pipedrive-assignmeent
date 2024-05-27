import { Express } from 'express';
import router from './router/router';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());
app.use('', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});