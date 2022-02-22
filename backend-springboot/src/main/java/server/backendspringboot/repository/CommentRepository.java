package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT s FROM Comment s WHERE s.accountId =?1")
    List<Comment> getCommentsByAccountId(Long accountId);

    @Query("SELECT s FROM Comment s WHERE s.postId =?1")
    List<Comment> getCommentsByPostId(Long postId);
}
