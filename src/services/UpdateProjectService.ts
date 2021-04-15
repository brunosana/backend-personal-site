import { getRepository } from "typeorm";
import { validate } from "uuid";
import AppError from "../errors/AppError";
import Project from "../models/Project";

interface  Request{
    id: string;
    name: string;
    area: string;
    tags?: Array<string>;
    url: string;
}

class UpdateProjectService {
    public async execute({id, name, area, tags, url}: Request): Promise<Project> {
        if(!validate(id)){
            throw new AppError('Invalid ID property');
        }
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

        const projectExists = await projectsRepository.findOne({
            where: { id }
        });

        if(!projectExists){
            throw new AppError('Project not found', 404)
        }

        projectExists.area = area;
        projectExists.name = name;
        if(tags)
        projectExists.tags = tags;
        projectExists.url = url;

        await projectsRepository.save(projectExists);

        return projectExists;
    }
}

export default UpdateProjectService;
