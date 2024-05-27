import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../exceptions/api-error';


export const apiRequest = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        return await axios(config);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const apiError: ApiError = new Error(error.message);
            apiError.status = error.response?.status || 500;
            apiError.data = error.response?.data || 'An error occurred';
            throw apiError;
        } else {
            const unknownError: ApiError = new Error('An unknown error occurred');
            unknownError.status = 500;
            throw unknownError;
        }
    }
};
