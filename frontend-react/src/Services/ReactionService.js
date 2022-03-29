import axios from 'axios';

const REACTION_API_BASE_URL = "http://localhost:8080/reactions";

class ReactionService {

    // General reactions
    getReactions() {
        return axios.get(REACTION_API_BASE_URL + "/allReactionTypes");
    }
    getReactionById(reaction_id) {
        return axios.get(REACTION_API_BASE_URL + "/reactionById/" + reaction_id);
    }

    // User reactions
    getReactionsByPostId(post_id) {
        return axios.get(REACTION_API_BASE_URL + "/reactionsByPostId/" + post_id);
    }
    addReaction(user_reaction) {
        return axios.post(REACTION_API_BASE_URL + "/addReaction", user_reaction);
    }
    getReactionCountsByPostId(post_id) {
        return axios.get(REACTION_API_BASE_URL + "/reactionCounts/" + post_id);
    }
    deleteByPostId(post_id) {
        return axios.delete(REACTION_API_BASE_URL + "/deleteByPostId/" + post_id);
    }

}

export default new ReactionService()