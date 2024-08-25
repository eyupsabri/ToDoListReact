import axios, { AxiosResponse } from "axios";
import { LoginResponseType } from "../types/LoginResponse.type";
import { RegisterType } from "../types/Register.type";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

class AuthService {
  private api = axios.create({
    baseURL: apiUrl + "api/UserContoller",
  });

  public async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<LoginResponseType>> {
    return this.api.post<LoginResponseType>(`/Login`, { email, password });
  }

  public async register(
    data: RegisterType
  ): Promise<AxiosResponse<LoginResponseType>> {
    return this.api.post<LoginResponseType>(`/register`, data);
  }
}

export default new AuthService();
