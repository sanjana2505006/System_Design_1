import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    // Simple Token Check (Simulating JWT / API Key)
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // In a real app, verify token here (e.g., jwt.verify(token, ...))
    // For this workshop/demo, we accept the token 'secret-token-123'
    if (token !== 'secret-token-123') {
        return next(new AppError('Invalid token. Access denied.', 403));
    }

    next();
};
