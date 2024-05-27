import { Router } from "express";
import DealController from "../controller/deal-controller";

const router = Router();
const dealController = new DealController();

router.get('/deals', dealController.getDeals);
router.post('/deals', dealController.addDeal);
router.put('/deals/:id', dealController.updateDeal);

export default router;