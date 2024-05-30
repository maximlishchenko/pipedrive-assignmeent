import { Response } from 'express';
import { ApiError } from '../exceptions/api-error';

export const handleError = (res: Response, error: ApiError): void => {
    res.status(error.status || 500).json({
        message: error.message,
        data: error.data || 'An error occurred',
    });
};
