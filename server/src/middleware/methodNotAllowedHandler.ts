import { Request, Response, NextFunction } from 'express';
import { MethodNotAllowedError } from '../errors/MethodNotAllowedError';

export function methodNotAllowedHandler(_req: Request, _res: Response, next: NextFunction) {
    next(new MethodNotAllowedError());
}
