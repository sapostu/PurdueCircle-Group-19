package server.backendspringboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.backendspringboot.model.Reaction;
import server.backendspringboot.model.UserReaction;
import server.backendspringboot.repository.ReactionRepository;
import server.backendspringboot.repository.UserReactionsRepository;

@RestController
@CrossOrigin
@RequestMapping("/reactions")
public class ReactionController {
    @Autowired
    private ReactionRepository reactionRepository;
    @Autowired
    private UserReactionsRepository userReactionsRepository;

    @GetMapping("/allReactionTypes")
    public List<Reaction> getAllReactions() {
        return reactionRepository.findAll();
    }

    @GetMapping("/reactionById/{reactionId}")
    public Reaction getReactionById(@PathVariable long reactionId) {
        Optional<Reaction> o = reactionRepository.findById(reactionId);
        if (o.isPresent())
            return o.get();
        else
            return null;
    }

    @GetMapping("/reactionsByPostId/{postId}")
    public List<UserReaction> getReactionsByPostId(@PathVariable long postId) {
        return userReactionsRepository.getReactionsByPostId(postId);
    }

    @GetMapping("/reactionCounts/{postId}")
    public Map<Long, Integer> getReactionCountsByPostId(@PathVariable long postId) {
        Map<Long, Integer> ret = new HashMap<Long, Integer>();
        List<Reaction> reactionTypes = reactionRepository.findAll();
        for (Reaction r : reactionTypes) {
            int count = userReactionsRepository.countReactionsByPostIdAndReactionId(postId, r.getReactionId());
            ret.put(r.getReactionId(), count);
        }
        return ret;
    }

    @GetMapping(path= "/reactionsByAccountId/{account_id}")
    public List<UserReaction> getTagNamesByAccount_id(@PathVariable("account_id") String account_id) {
        return userReactionsRepository.getReactionsByAccountId(Integer.parseInt(account_id));
    }

    @DeleteMapping("/deleteByPostId/{postId}")
    public void deleteReactionsByPostId(@PathVariable long postId) {
        userReactionsRepository.deleteUserReactionsByPostId(postId);
    }

    @PostMapping("/addReaction")
    public void addReaction(@RequestBody UserReaction userReaction) {
        long postId = userReaction.getPostId();
        long accountId = userReaction.getAccountId();
        long reactionId = userReaction.getReactionId();
        
        // find this user's previous reaction on this post
        UserReaction prevUserReaction = userReactionsRepository.getReactionByAccountIdAndPostId(accountId, postId);
        
        if (prevUserReaction == null) {
            // no stored reaction, so add reaction
            userReactionsRepository.save(new UserReaction(postId, accountId, reactionId));
        }
        else {
            // has previous reaction
            if (prevUserReaction.getReactionId() == reactionId) {
                // sending same reaction, so remove their reaction
                userReactionsRepository.delete(userReactionsRepository.getReactionByAccountIdAndPostId(accountId, postId));
            }
            else {
                // sending new reaction, so change their reaction
                userReactionsRepository.save(new UserReaction(postId, accountId, reactionId));
            }
        }

    }
}
