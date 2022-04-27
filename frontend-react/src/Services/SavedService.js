import axios from 'axios';

const SAVED_API_BASE_URL = "http://localhost:8080/posts_saved";

class SavedService {

    getByUser(username) {
        return axios.get(SAVED_API_BASE_URL + "/allUser/" + username);
    }

    save(post_saved) {
        return axios.post(SAVED_API_BASE_URL + "/save", post_saved);
    }

    isSaved(post_id, username) {
        return axios.get(SAVED_API_BASE_URL + "/isSaved/" + post_id + "/" + username);
    }

}

export default new SavedService();