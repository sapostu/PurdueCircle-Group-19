import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class LoginService {

    loginAccount(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/login", account);
    }

}

export default new LoginService()