package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.backendspringboot.model.Post;
import server.backendspringboot.model.posts_saved;
import server.backendspringboot.repository.AccountRepository;
import server.backendspringboot.repository.PostRepository;
import server.backendspringboot.repository.Posts_SavedRepository;
import server.backendspringboot.repository.TagsRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/posts_saved")
public class Posts_SavedController {

    @Autowired
    private Posts_SavedRepository postRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PostRepository pc;

    @Autowired
    private TagsRepository tr;
    
    @GetMapping("/all/{account_id}")
    public List<posts_saved> getAllSavedPosts(@PathVariable("account_id") long account_id) {
        return postRepository.getPostsSavedByAccountId(account_id);
    }

    /**
     * returns
     * {
     *      postId:
     *      username: 
     *      isAnon: 
     *      date:
     *      content:
     *      tag:
     * }
     * 
     * 
     */
    @GetMapping("/allUser/{username}")
    public List<Map<String, String>> getAllSavedPostsByUsername(@PathVariable("username") String username) {
        List<posts_saved> tmp = postRepository.getPostsSavedByAccountId((long)accountRepository.getAccountByUsername(username).getAccount_id());
        List<Map<String, String>> ret = new ArrayList<Map<String, String>>();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        for (posts_saved ps : tmp) {
            Optional<Post> opt = pc.findById(ps.getPost_id());
            if (opt.isPresent()) {
                Post post = opt.get();
                Map<String, String> map = new HashMap<String, String>();

                map.put("postId", String.valueOf(post.getPostId()));
                map.put("username", accountRepository.findById((int)post.getAccountId()).get().getUsername());
                map.put("isAnon", (post.getIsAnon() != 0) ? "Anon" : null);
                map.put( "date", df.format(post.getDateOfPost()) );
                map.put( "content", post.getBio() );
                map.put("tag", tr.findById(post.getTag_id()).get().getTagName());

                ret.add(map);
            }
        }
        return ret;
    }

    /**
     * send in
     * {
     *      post_id: 
     *      username: 
     * }
     */
    @PostMapping("/save")
    public String saveOrUnsave(@RequestBody Map<String, String> map) {
        Long account_id = (long) accountRepository.getAccountByUsername(map.get("username")).getAccount_id();
        Long post_id = Long.parseLong(map.get("post_id"));
        if ( !postRepository.getDuplicates(account_id, post_id).isEmpty() ) {
            // already saved, so unsave
            postRepository.unsavePost(account_id, post_id);
            return "unsaved";
        }
        // save
        posts_saved ret = new posts_saved();
        ret.setPost_id(post_id);
        ret.setAccount_id(account_id);
        postRepository.save(ret);
        return "saved";
    }

    @GetMapping("/isSaved/{post_id}/{username}")
    public boolean isSaved(@PathVariable("post_id") long post_id, @PathVariable("username") String username) {
        Long account_id = (long) accountRepository.getAccountByUsername(username).getAccount_id();
        return !postRepository.getDuplicates(account_id, post_id).isEmpty();
    }

}
