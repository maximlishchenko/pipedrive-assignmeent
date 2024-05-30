import express, { Express } from "express";
import router from "./router/router";
import { logger } from "./middleware/logging-middleware";

const app: Express = express();

app.use(express.json());
app.use(logger);
app.use('/api', router);

export default app;