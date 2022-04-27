import axios from 'axios';

const ACCOUNT_API_BASE_URL = "http://localhost:8080";

class PostService {

    createPost(post) {
        return axios.post(ACCOUNT_API_BASE_URL + "/posts", post);
    }

    deletePost(post) {
        return axios.post(ACCOUNT_API_BASE_URL + "/posts/delete", post);
    }
  
    getPostsByName(username) {
        return axios.get(ACCOUNT_API_BASE_URL + "/posts/postByName" +  username)
    }
    
    getPostById(post_id) {
        return axios.get(ACCOUNT_API_BASE_URL + "/posts/" + post_id);
    }

    getFollowedTagsByAccountId(account_id) {
        return axios.get(ACCOUNT_API_BASE_URL + "/posts/followedTagsByAccountId/" + account_id)
    }

    getPostsByAccountId(account_id) {
        return axios.get(ACCOUNT_API_BASE_URL + "/posts/postByAccountId/" + account_id)
    }

    getPostsByTagId(tag_id) {
        return axios.get(ACCOUNT_API_BASE_URL + "/posts/postByTagId/" + tag_id)
    }

    getPostsByTagIdBlock(tag_id, account_id) {
        console.log('tag: ' + tag_id + ' account: ' + account_id);
        return axios.get(ACCOUNT_API_BASE_URL + "/posts/postByTagIdBlock/" + tag_id + "/" + account_id)
    }
}

export default new PostService()