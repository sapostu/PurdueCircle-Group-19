import axios from 'axios';

const FOLLOW_API_BASE_URL = "http://localhost:8080/following";
const INTERESTS_API_BASE_URL = "http://localhost:8080/interests";

class FollowService {

    followAccount(account) {
        return axios.post(FOLLOW_API_BASE_URL + "/addFollow", account);
    }

    unfollowAccount(account) {
        return axios.post(FOLLOW_API_BASE_URL + "/deleteFollow", account);
    }

    isFollowing(account) {
        return axios.post(FOLLOW_API_BASE_URL + "/checkFollow", account);
    }

    followTopic(account) {
        return axios.post(INTERESTS_API_BASE_URL + "/addInterests", account);
    }

    unfollowTopic(account) {
        return axios.post(INTERESTS_API_BASE_URL + "/deleteInterests", account);
    }

    isFollowingTopic(account) {
        return axios.post(INTERESTS_API_BASE_URL + "/checkInterests", account);
    }
}

export default new FollowService()