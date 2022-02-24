import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class AccountService {

    createAccount(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/signup", account);
    }

    updateAccountEmail(account) {
        return axios.put(ACCOUNT_API_BASE_URL + "/credentials/email", account);
    }

    updateAccountUsername(account) {
        return axios.put(ACCOUNT_API_BASE_URL + "/credentials/username", account);
    }

    updateAccountPassword(account) {
        return axios.put(ACCOUNT_API_BASE_URL + "/credentials/password", account);
    }

}

export default new AccountService()