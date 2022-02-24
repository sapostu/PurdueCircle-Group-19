import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class DeleteService {

    deleteAccount(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/delete", account);
    }

}

export default new DeleteService()