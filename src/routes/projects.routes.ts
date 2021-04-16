import { Router } from 'express';
import { getRepository } from 'typeorm';
import isAuthenticated from '../middlewares/isAuthenticated';
import Project from '../models/Project';

import CreateUserService from '../services/CreateProjectService';
import DeleteProjectService from '../services/DeleteProjectService';
import UpdateProjectService from '../services/UpdateProjectService';

const projectsRouter = Router();

projectsRouter.get('/', async (request, response) => {
    const projectsRepository = getRepository(Project);
    const projects = await projectsRepository.find();
    return response.json(projects);
});

projectsRouter.use(isAuthenticated);

projectsRouter.post('/', async (request, response) => {
    const { name, url, tags, area } = request.body;
    const createUserService = new CreateUserService();
    const project = await createUserService.execute({
        name,
        area,
        url,
        tags
    });
    return response.json(project);
});

projectsRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { name, url, tags, area } = request.body;
    const updateProjectService = new UpdateProjectService();
    const project = await updateProjectService.execute({
                        id,
                        name,
                        url,
                        tags,
                        area
                    });

    return response.json(project);
});

projectsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const deleteProjectService = new DeleteProjectService();
    await deleteProjectService.execute(id);

    return response.status(204).send();
});

export default projectsRouter;
