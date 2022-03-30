import axios from 'axios';

const COMMENT_API_BASE_URL = "http://localhost:8080/comments";

class CommentService {

    getCommentsByPostId(post_id) {
        return axios.get(COMMENT_API_BASE_URL + "/postId/" + post_id);
    }

    addComment(comment) {
        return axios.post(COMMENT_API_BASE_URL + "/addComment/", comment);
    }

    deleteByPostId(post_id) {
        return axios.delete(COMMENT_API_BASE_URL + "/deleteByPostId/" + post_id);
    }

}

export default new CommentService()