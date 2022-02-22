import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class AccountService {

    createAccount(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/signup", account);
    }

}

export default new AccountService()