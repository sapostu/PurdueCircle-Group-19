import axios from "axios";

const MESSAGE_API_BASE_URL = "http://localhost:8080/message";

class MessageService {

    getMessagesByUsernames(username1, username2) {
        return axios.get(MESSAGE_API_BASE_URL + "/chatUser/" + username1 + "/" + username2);
    }

    addById(msg) {
        return axios.post(MESSAGE_API_BASE_URL + "/add", msg);
    }

    addByUser(msg) {
        return axios.post(MESSAGE_API_BASE_URL + "/addByUser", msg);
    }

}

export default new MessageService();