package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.Post;
import server.backendspringboot.repository.PostRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

   /* @Autowired
    public PostController(PostRepository postRepository) {
        this.postRepository= postRepository;
    }  */

    @GetMapping("/allposts")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("{postId}")
    public Post getPostByPostId(@PathVariable("postId") Long postId) {
        return postRepository.findById(postId).orElseThrow(() ->
                new IllegalStateException("No post with id of " + postId));
    }

    @GetMapping("/postByAuthor{authorId}")
    public List<Post> getPostByAuthorId(@PathVariable("authorId") Long authorId) {
        return postRepository.getPostByAuthor(authorId);
    }

    @PostMapping
    public Post addPost(@RequestBody Post post) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();
        post.setDateOfPost(date);
        return postRepository.save(post);
    }

    @PostMapping("/delete")
    public void deleteByPostId(@RequestBody Post post) {
        long postId = post.getPostId();
        System.out.println("postid= " + postId);
        Post toDel = postRepository.getById(postId);
        postRepository.delete(toDel);
    }

    @DeleteMapping(path = "/deleteUserPost/{accountId}")
    public void deleteByAccountId(@PathVariable("accountId") long accountId) {
        List<Post> toDel = postRepository.getPostByAuthor(accountId);
        postRepository.deleteAll(toDel);
    }
}
