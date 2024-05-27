import { Request, Response } from "express";
import { apiRequest } from "../utils/api-request";
import { sendResponse, handleError } from "../utils/response-handler";

class DealController {

    async getDeals(req: Request, res: Response): Promise<void> {
        try {
            const response = await apiRequest({
                method: 'GET',
                url: `${process.env.PIPEDRIVE_API_URL}/deals`,
                params: {
                    api_token: process.env.API_TOKEN,
                },
            });
            sendResponse(res, response.data, 200);
        } catch (error: unknown) {
            handleError(res, error as any);
        }
    }

    async addDeal(req: Request, res: Response): Promise<void> {
        try {
            const response = await apiRequest({
                method: 'POST',
                url: `${process.env.PIPEDRIVE_API_URL}/deals`,
                data: req.body,
                params: {
                    api_token: process.env.API_TOKEN,
                },
            });
            sendResponse(res, response.data, 200);
        } catch (error: unknown) {
            handleError(res, error as any);
        }
    }

    async updateDeal(req: Request, res: Response): Promise<void> {
        try {
            const dealId = req.params.id;
            const response = await apiRequest({
                method: 'PUT',
                url: `${process.env.PIPEDRIVE_API_URL}/deals/${dealId}`,
                data: req.body,
                params: {
                    api_token: process.env.API_TOKEN,
                },
            });
            sendResponse(res, response.data, 200);
        } catch (error: unknown) {
            handleError(res, error as any);
        }
    }
}

export default DealController;