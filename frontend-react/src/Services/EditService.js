import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class EditService {

    editAccount(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/edit", account);
    }

}

export default new EditService()