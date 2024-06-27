import axios from "axios";
import { LoginRequest } from "./dto/auth";
import Service from "./service";


class AuthService extends Service {
    login = async (request: LoginRequest) => {
        return await axios.post(`${this.BASE_URL}/login`, request);
    }
}

export default new AuthService();