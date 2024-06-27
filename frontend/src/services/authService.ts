import axios from "axios";
import { ILoginRequest, IRegisterRequest } from "./dto/auth";
import Service from "./service";


class AuthService extends Service {
    login = async (request: ILoginRequest) => {
        return await axios.post(`${this.BASE_URL}/login`, request);
    }

    register = async (request:IRegisterRequest) => {
        return await axios.post(`${this.BASE_URL}/players/register`, request);
    }
}
const authService = new AuthService();
export default authService;