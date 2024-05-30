import { Request, Response } from "express";
import { handleError } from "../utils/response-handler";
import { dealService, DealService } from "../service/deal-service";

class DealController {

    private dealService: DealService = dealService;

    getDeals = async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await this.dealService.getDeals();
            res.status(200).json(response.data);
        } catch (error: unknown) {
            handleError(res, error as any);
        }
    };

    addDeal = async (req: Request, res: Response): Promise<void> => {
        try {
            const response = await this.dealService.addDeal(req.body);
            res.status(201).json(response.data);
        } catch (error: unknown) {
            handleError(res, error as any);
        }
    }

    updateDeal = async (req: Request, res: Response): Promise<void> => {
        try {
            const dealId = req.params.id;
            const response = await this.dealService.updateDeal(dealId, req.body);
            res.status(200).json(response.data);
        } catch (error: unknown) {
            handleError(res, error as any);
        }
    }
}

export const dealController = new DealController();