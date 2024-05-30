import { Router, Request, Response } from 'express';
import { dealController } from '../controller/deal-controller';
import { metricsService } from '../service/metrics-service';

const router = Router();

router.get('/deals', dealController.getDeals);
router.post('/deals', dealController.addDeal);
router.put('/deals/:id', dealController.updateDeal);

// get metrics endpoint
// comment to delete
router.get('/metrics', (req: Request, res: Response) => {
    res.status(200).json(metricsService.getMetrics());
})

export default router;