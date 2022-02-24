import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class AccountService {

    loginAccount(account) {
        return axios.get(ACCOUNT_API_BASE_URL + "/login", account);
    }

}

export default new AccountService()