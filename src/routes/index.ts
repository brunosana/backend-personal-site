import { Router } from 'express';

import projectsRouter from './projects.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter)  ;

export default routes;
