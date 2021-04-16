import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.use(isAuthenticated);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
        name,
        email,
        password
    });

    delete user.password;

    return response.json(user);

});

export default usersRouter;
