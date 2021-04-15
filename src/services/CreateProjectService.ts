import { getRepository } from "typeorm";
import AppError from "../errors/AppError";
import Project from "../models/Project";

interface  Request{
    name: string;
    area: string;
    tags?: Array<string>;
    url: string;
}


class CreateProjectService {
    public async execute({area, name, url, tags }: Request): Promise<Project> {
        if(!name){
            throw new AppError('Missing name property');
        }
        if(!area){
            throw new AppError('Missing area property');
        }
        if(!url){
            throw new AppError('Missing Url Property')
        }

        const projectsRepository = getRepository(Project);

        const project = await projectsRepository.create({
            name,
            area,
            url,
            tags
        });

        await projectsRepository.save(project);

        return project;
    }
}

export default CreateProjectService;
