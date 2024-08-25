import { ProjectType } from "../types/Project.type";
import BaseService from "./baseService";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

class ProjectService extends BaseService {
  constructor() {
    super(apiUrl + "api");
  }

  public async getProjects() {
    return this.get<ProjectType[]>("/Projects/GetProjects");
  }
}

export default new ProjectService();
