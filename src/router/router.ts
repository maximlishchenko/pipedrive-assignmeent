import { Router } from "express";
import DealController from "../controller/deal-controller";

const router = Router();
const dealController = new DealController();

router.get('/deals', dealController.getDeals);

export default router;