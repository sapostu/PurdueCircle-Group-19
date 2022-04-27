import axios from 'axios';

const INTERESTS_API_BASE_URL = "http://localhost:8080/interests";

class InterestsService {

    namesByAccount(account_id) {
        return axios.get(INTERESTS_API_BASE_URL + "/namesByAccount/".concat(account_id));
    }

}

export default new InterestsService()