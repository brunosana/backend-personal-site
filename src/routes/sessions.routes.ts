import { Router } from 'express';
import SignInService from '../services/SignInService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const signInService = new SignInService();

    const data = await signInService.execute({
        email,
        password
    });

    return response.json(data);
});

export default sessionsRouter;
