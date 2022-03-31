import axios from 'axios';

const TOPIC_API_BASE_URL = "http://localhost:8080/posts";

class TopicService {

    getTopicPosts(topic) {
        return axios.get(TOPIC_API_BASE_URL + "/postByTag", topic);
    }

}

export default new TopicService()