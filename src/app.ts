import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import './database';
import 'reflect-metadata';

import AppError from './errors/AppError';
import Routes from './routes';

const app = express();

app.use(express.json());

app.use(Routes);

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'Error',
            message: error.message
        });
    }
    console.error(error.message);
    return response.status(500).json({
        status: 'Error',
        message: 'Internal server error'
    });
});

export default app;
