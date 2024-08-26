import BaseService from "./baseService";
import { TaskType } from "../types/Task.type";
import { TaskStatusUpdateType } from "../types/TaskStatusUpdate.type";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

class TaskService extends BaseService {
  constructor() {
    super(apiUrl + "api");
  }

  public async getTasks(projectId: number) {
    return this.get<TaskType[]>(`/Tasks/GetAllTasks/${projectId}`);
  }

  public async updateTask(updateTask: TaskStatusUpdateType) {
    console.log(updateTask);
    return this.post<boolean>("/Tasks/UpdateTaskStatus", updateTask);
  }
}

export default new TaskService();
