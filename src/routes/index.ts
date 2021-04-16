import { Router } from 'express';

import projectsRouter from './projects.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import mailRoutes from './mail.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/mail', mailRoutes);

export default routes;
