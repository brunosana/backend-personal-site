import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Message from '../models/Message';

interface Request {
    name: string;
    message: string;
    email?: string;
}

class SendMaiLService {
    public async execute({ name, message, email }: Request): Promise<void> {
        if(!name) {
            throw new AppError('Missing name Property');
        }

        if(!message) {
            throw new AppError('Missing message property');
        }

        const messagesRepository = getRepository(Message);

        const messageItem = messagesRepository.create({
            name,
            email,
            message
        });

        await messagesRepository.save(messageItem);
    }
}

export default SendMaiLService;
