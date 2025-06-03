import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/NotFoundError';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    console.log(`No route matched for: ${req.method} ${req.originalUrl}`);
    next(new NotFoundError());
};
