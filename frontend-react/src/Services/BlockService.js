import axios from 'axios'

const BLOCK_API_BASE_URL = "http://localhost:8080/blocked"

class BlockService {

    blockAccount(account) {
        return axios.post(BLOCK_API_BASE_URL + "/addBlock", account);
    }

    unBlockAccount(account) {
        return axios.post(BLOCK_API_BASE_URL + "/deleteBlock", account);
    }

    checkBlock(account) {
        return axios.post(BLOCK_API_BASE_URL + "/checkBlock", account);
    }

}
export default new BlockService()