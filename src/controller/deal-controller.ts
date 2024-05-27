import { Request, Response } from "express";
import axios from 'axios';

class DealController {

    async getDeals(req: Request, res:Response): Promise<void> {
        try {
            const response = await axios.get(`${process.env.PIPEDRIVE_API_URL}/deals`, {
                params: {
                    api_token: process.env.API_TOKEN
                }
            });
            res.status(200).json(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({
                    message: error.message,
                    data: error.response?.data || 'An error occurred'
                });
            } else {
                res.status(500).json({
                    message: 'An unknown error occurred'
                });
            }
        }
    }

    async addDeal(req: Request, res:Response): Promise<void> {
        try {
            const response = await axios.post(`${process.env.PIPEDRIVE_API_URL}/deals`, req.body, {
                params: {
                    api_token: process.env.API_TOKEN
                }
            });
            res.status(200).json(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({
                    message: error.message,
                    data: error.response?.data || 'An error occurred'
                });
            } else {
                res.status(500).json({
                    message: 'An unknown error occurred'
                });
            }
        }
    }

    async updateDeal(req: Request, res:Response): Promise<void> {
        try {
            const dealId = req.params.id;
            const response = await axios.put(`${process.env.PIPEDRIVE_API_URL}/deals/${dealId}`, req.body, {
                params: {
                    api_token: process.env.API_TOKEN
                }
            });
            res.status(200).json(response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json({
                    message: error.message,
                    data: error.response?.data || 'An error occurred'
                });
            } else {
                res.status(500).json({
                    message: 'An unknown error occurred'
                });
            }
        }
    }
}

export default DealController;