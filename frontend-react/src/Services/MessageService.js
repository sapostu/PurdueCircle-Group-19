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

    getAllChats(user_id) {
        return axios.get(MESSAGE_API_BASE_URL + "/getAllChats/" + user_id);
    }

}

export default new MessageService();