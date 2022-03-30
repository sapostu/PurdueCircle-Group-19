package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT s FROM Post s WHERE s.accountId =?1")
    List<Post> getPostByAuthor(long authorId);

    @Query(value = "SELECT * FROM post JOIN account ON post.account_id=account.account_id WHERE account.username = ?1", nativeQuery = true)
    List<Post> getPostByName(String name);
}
