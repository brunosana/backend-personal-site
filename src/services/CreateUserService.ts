import { getRepository } from "typeorm";
import { hash } from 'bcrypt';

import AppError from "../errors/AppError";
import User from "../models/User";

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        if(!name){
            throw new AppError('Missing name property');
        }
        if(!email){
            throw new AppError('Missing email property');
        }
        if(!password){
            throw new AppError('Missing password property');
        }

        const usersRepository = getRepository(User);

        const checkIfEmailExists = await usersRepository.findOne({
            where: { email }
        });

        if (checkIfEmailExists) {
            throw new AppError('Email in use');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user);

        return user;

    }
}

export default CreateUserService;
