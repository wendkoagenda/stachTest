import getConfig from "@/config";
import axios from "axios";

const LOGIN_ROUTE = "auth/login";

interface LoginModel {
  email: string;
  password: string;
}

class _LoginService {
  postLogin(model: LoginModel) {
    return axios.post(`${getConfig().apiBaseUrl}${LOGIN_ROUTE}`, model);
  }
}
const LoginService = new _LoginService();
export default LoginService;
