package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.Comment;
import server.backendspringboot.model.Post;
import server.backendspringboot.repository.CommentRepository;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @GetMapping("/commentId/{commentId}")
    public Comment getCommentByCommId(@PathVariable("commentId") long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() ->
                new IllegalStateException("No such comment with id: " + commentId));
    }

    @GetMapping("/accountId/{authorId}")
    public List<Comment> getCommentByAuthorId(@PathVariable("authorId") long authorId) {
        return commentRepository.getCommentsByAccountId(authorId);
    }

    @GetMapping("/postId/{postId}")
    public List<Comment> getCommentByPostId(@PathVariable("postId") long postId) {
        return commentRepository.getCommentsByPostId(postId);
    }

    @PostMapping("/addComment/")
    public Comment addComment(@RequestBody Comment comment) {
        comment.setDate(new Date());
        commentRepository.save(comment);
        return comment;
    }

//    @DeleteMapping("/delete/{commentId}")
//    public void deleteComment(@PathVariable("commentId") long commentId) {
//       commentRepository.deleteById(commentId);
//    }

    @DeleteMapping("/deleteByPostId/{postId}")
    public void deleteCommentsByPostId(@PathVariable long postId) {
        commentRepository.detleteCommentsByPostId(postId);
    }

    @PostMapping("/delete")
    public void deleteByCommentId(@RequestBody Comment comment) {
        long commentId = comment.getCommentId();
        Comment toDel = commentRepository.getById(commentId);
        commentRepository.delete(toDel);
    }


}
