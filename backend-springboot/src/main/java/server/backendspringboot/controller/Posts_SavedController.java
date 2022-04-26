package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.backendspringboot.model.posts_saved;
import server.backendspringboot.repository.Posts_SavedRepository;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/posts_saved")
public class Posts_SavedController {

    @Autowired
    private Posts_SavedRepository postRepository;
    
    @GetMapping("/all")
    public List<posts_saved> getAllSavedPosts(@PathVariable("account_id") long account_id) {
        return postRepository.getPostsSavedByAccountId(account_id);
    }
}
