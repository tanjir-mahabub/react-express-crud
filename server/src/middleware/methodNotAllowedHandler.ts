import { Request, Response } from 'express';

export const methodNotAllowedHandler = (req: Request, res: Response) => {
    res.status(405).json({
        status: 'error',
        message: `Method ${req.method} not allowed on ${req.originalUrl}`,
    });
};
