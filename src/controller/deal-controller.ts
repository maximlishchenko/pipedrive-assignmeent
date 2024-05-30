import { Request, Response } from "express";
import { handleError } from "../utils/response-handler";
import { dealService, DealService } from "../service/deal-service";
import { metricsService } from "../service/metrics-service";

class DealController {

    private dealService: DealService = dealService;

    getDeals = async (req: Request, res: Response): Promise<void> => {
        const start = process.hrtime();
        try {
            const response = await this.dealService.getDeals();
            res.status(200).json(response.data);
        } catch (error: unknown) {
            handleError(res, error as any);
        } finally {
            const duration = process.hrtime(start);
            const durationMs = (duration[0] * 1e9 + duration[1]) / 1e6; // convert to ms
            metricsService.logRequest('getDeals', durationMs);
        }
    };

    addDeal = async (req: Request, res: Response): Promise<void> => {
        const start = process.hrtime();
        try {
            const response = await this.dealService.addDeal(req.body);
            res.status(201).json(response.data);
        } catch (error: unknown) {
            handleError(res, error as any);
        } finally {
            const duration = process.hrtime(start);
            const durationMs = (duration[0] * 1e9 + duration[1]) / 1e6; // convert to ms
            metricsService.logRequest('addDeal', durationMs);
        }
    }

    updateDeal = async (req: Request, res: Response): Promise<void> => {
        const start = process.hrtime();
        try {
            const dealId = req.params.id;
            const response = await this.dealService.updateDeal(dealId, req.body);
            res.status(200).json(response.data);
        } catch (error: unknown) {
            handleError(res, error as any);
        } finally {
            const duration = process.hrtime(start);
            const durationMs = (duration[0] * 1e9 + duration[1]) / 1e6; // convert to ms
            metricsService.logRequest('updateDeal', durationMs);
        }
    }
}

export const dealController = new DealController();