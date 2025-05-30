import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';
import { Prisma } from '@prisma/client';

// errorHandler.ts
export const errorHandler: ErrorRequestHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error(`[ERROR]: ${err.name} - ${err.message}`);

    // Handle Prisma Unique Constraint Error
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        res.status(409).json({
            status: 'error',
            statusCode: 409,
            message: `Duplicate value for unique field: ${(err.meta as any)?.target?.join(', ')}`,
        });
        return;
    }

    // ✅ Handle Malformed JSON (from express.json body parser)
    if (
        err instanceof SyntaxError &&
        (err as any).status === 400 &&
        'body' in err
    ) {
        res.status(400).json({
            status: 'error',
            statusCode: 400,
            message: 'Malformed JSON in request body',
        });
        return;
    }

    // Handle Known Application Errors
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message,
        });
        return;
    }

    // Fallback
    res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Something went wrong',
    });
};
