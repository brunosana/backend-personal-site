import { getRepository } from "typeorm";
import { compare } from 'bcrypt';
import AppError from "../errors/AppError";
import User from "../models/User";
import { sign } from "jsonwebtoken";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class SignInService {
    public async execute({ email, password }: Request): Promise<Response> {
        if(!email) {
            throw new AppError('Missing email property');
        }
        if(!password) {
            throw new AppError('Missing password property');
        }

        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne({
            where: { email }
        });

        if(!userExists){
            throw new AppError('Invalid credentials', 401);
        }

        const checkPasswordMatch = await compare(password, userExists.password);

        if(!checkPasswordMatch){
            throw new AppError('Invalid credentials', 401);
        }

        const token = sign({},process.env.SECRET, {
            subject: userExists.id,
            expiresIn: '1d'
        });

        return { user: userExists, token };

    }
}

export default SignInService;
