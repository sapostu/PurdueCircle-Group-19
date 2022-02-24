import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080";

class PostService {

    createPost(post) {
        return axios.post(ACCOUNT_API_BASE_URL + "/posts", post);
    }

    deletePost(post) {
        return axios.post(ACCOUNT_API_BASE_URL + "/posts/delete", post);
    }
}

export default new PostService()