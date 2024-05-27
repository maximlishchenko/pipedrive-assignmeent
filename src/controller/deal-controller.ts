import { Request, Response } from "express";
import axios from 'axios';

class DealController {
    async getDeals(req: Request, res:Response) {
        try {
            const response = await axios.get(`${process.env.PIPEDRIVE_API_URL}/deals`, {
                params: {
                    api_token: process.env.API_TOKEN
                }
            });
            res.status(200).json(response.data);
        } catch (error: unknown) {
            res.status(500).send(error);
        }
    }
}

export default DealController;