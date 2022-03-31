package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.Post;
import server.backendspringboot.model.Tags;
import server.backendspringboot.repository.PostRepository;
import server.backendspringboot.repository.TagsRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TagsController tc;

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

    @GetMapping("/postByName{username}")
    public List<Post> getPostByUsername(@PathVariable("username") String username) {
        return postRepository.getPostByName(username);
    }

    @PostMapping
    public Post addPost(@RequestBody Post post) {
        Date date = new Date();
        post.setDateOfPost(date);
        long tagId = getTagId(post.getTagName());
        post.setTag_id(tagId);
        return postRepository.save(post);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllPost() {
        postRepository.deleteAll(postRepository.findAll());
    }

    @PostMapping("/delete")
    public void deleteByPostId(@RequestBody Post post) {
        long postId = post.getPostId();
        Post toDel = postRepository.getById(postId);
        postRepository.delete(toDel);
    }

    @DeleteMapping(path = "/deleteUserPost/{accountId}")
    public void deleteByAccountId(@PathVariable("accountId") long accountId) {
        List<Post> toDel = postRepository.getPostByAuthor(accountId);
        postRepository.deleteAll(toDel);
    }

    @GetMapping(path= "/postByTag/{tag}")
    public List<Post> getPostByTagName(@PathVariable("tag") String tag) {
        System.out.println("before");
        //System.out.println(tag).getTagName());
        System.out.println("after");
        Long tagId = postRepository.getTagsByName(tag);
        if (tagId == null) {
            return null;
        }
        System.out.println(tagId);

        return postRepository.getPostByTag_id(tagId);
    }

    @GetMapping(path = "/followedTagsByUsername/{id}")
    public List<Tags> getFollowedTagsByAccountId(@PathVariable("id") long id) {
        return postRepository.getFollowedTagsByAccountId(id);
    }

    @GetMapping(path = "/postByTagId/{id}")
    public List<Post> getPostByTagId(@PathVariable("id") long id) {
        return postRepository.getPostByTag_id(id);
    }

    public Long getTagId(String tagName) {
        if (tagName == null) {
            return (long) -1;
        }
        Long tagId = postRepository.getTagsByName((tagName));
        if (tagId != null) {
            return tagId;
        } else {
            tc.addTags(new Tags(tagName));
            Tags toRet = tc.getTagsByTagName(tagName);
            return toRet.getTagId();
        }
    }

}
