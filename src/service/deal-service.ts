import { apiRequest } from "../utils/api-request";

export class DealService {

    async getDeals() {
        try {
            const deals = await apiRequest({
                method: 'GET',
                url: `${process.env.PIPEDRIVE_API_URL}/deals`,
                params: {
                    api_token: process.env.API_TOKEN,
                },
            });
            return deals;
        } catch (error: unknown) {
            throw error;
        }   
    }

    async addDeal(data: any) {
        try {
            const createdDeal = await apiRequest({
                method: 'POST',
                url: `${process.env.PIPEDRIVE_API_URL}/deals`,
                data: data,
                params: {
                    api_token: process.env.API_TOKEN,
                },
            });
            return createdDeal;
        } catch (error: unknown) {
            throw error;
        }
    }

    async updateDeal(dealId: string, data: any) {
        try {
            const updatedDeal = apiRequest({
                method: 'PUT',
                url: `${process.env.PIPEDRIVE_API_URL}/deals/${dealId}`,
                data: data,
                params: {
                    api_token: process.env.API_TOKEN,
                },
            });
            return updatedDeal;
        } catch (error: unknown) {
            throw error;
        }
    }
}

export const dealService = new DealService();