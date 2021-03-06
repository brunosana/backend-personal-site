import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new AppError('Missing token property');
    }

    const [,token] = authHeader.split(' ');

    try {
        const decoded = verify(token, process.env.SECRET);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub
        };

        return next();
    }catch(err){
        throw new Error('Invalid JWT Token');
    }
}
