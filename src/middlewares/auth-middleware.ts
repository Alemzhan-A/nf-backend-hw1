import { NextFunction, Request, Response } from 'express';
import AuthService from '../auth/auth-service';

const authService = new AuthService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const payload = authService.verifyJwt(token);
        if (payload) {
            (req as any).user = payload;
        }
    }
    next();
};
