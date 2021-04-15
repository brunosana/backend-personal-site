import { getRepository } from 'typeorm';
import { validate } from 'uuid';
import AppError from '../errors/AppError';
import Project from '../models/Project';

class DeleteProjectService {
    public async execute(id: string): Promise<void>{
        if(!validate(id)){
            throw new AppError('Invalid ID property');
        }
        const projectsRepository = getRepository(Project);
        const projectExists = await projectsRepository.findOne({
            where: { id }
        });
        if(!projectExists){
            throw new AppError('Project not found', 404);
        }
        await projectsRepository.remove(projectExists);
    }
}

export default DeleteProjectService;
