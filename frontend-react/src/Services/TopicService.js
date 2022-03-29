import axios from 'axios';

const TOPIC_API_BASE_URL = "http://localhost:8080/account";

class TopicService {

    getTopicPosts(topic) {
        return axios.get(TOPIC_API_BASE_URL + "/signup", topic);
    }

}

export default new TopicService()