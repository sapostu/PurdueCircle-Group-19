import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class AccountService {

    createAccount(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/signup", account);
    }

    updateAccountEmail(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/credentials/email", account);
    }

    updateAccountUsername(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/credentials/username", account);
    }

    updateAccountPassword(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/credentials/password", account);
    }

    getAccountById(account_id) {
        return axios.get(ACCOUNT_API_BASE_URL + "/getAccountbyID/" + account_id);
    }

}

export default new AccountService()