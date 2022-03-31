import axios from 'axios';

const TAG_API_BASE_URL = "http://localhost:8080/tags";

class TagService {

    getTagById(tag_id) {
        return axios.get(TAG_API_BASE_URL + "/getById/" + tag_id);
    }

    getTagByName(tag_name) {
        return axios.get(TAG_API_BASE_URL + "/getByName/" + tag_name)
    }

}

export default new TagService()