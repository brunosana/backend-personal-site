import { Router } from 'express';
import SendMaiLService from '../services/SendMailService';

const mailRoutes = Router();

mailRoutes.post('/', async (request, response) => {
    const { name, email, message } = request.body;

    const sendMailService = new SendMaiLService();

    await sendMailService.execute({
        name,
        email,
        message
    });

    return response.status(204).send();
});

export default mailRoutes;
