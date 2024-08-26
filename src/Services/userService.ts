import BaseService from "./baseService";
import { TaskType } from "../types/Task.type";
import { TaskStatusUpdateType } from "../types/TaskStatusUpdate.type";
import { UserType } from "../types/User.type";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

class UserService extends BaseService {
  constructor() {
    super(apiUrl + "api");
  }

  public async getAllUsers() {
    return this.get<UserType[]>(`/UserContoller/GetUsers`);
  }
}

export default new UserService();
