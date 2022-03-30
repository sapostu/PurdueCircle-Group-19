package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.Post;
import server.backendspringboot.model.Tags;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT s FROM Post s WHERE s.accountId =?1")
    List<Post> getPostByAuthor(long authorId);

    @Query(value = "SELECT account.username as name, post.* FROM post INNER JOIN account ON post.account_id=account.account_id WHERE post.tag_id = ?1", nativeQuery = true)
    List<Post> getPostByTag_id(long tagId);

    @Query("SELECT s.tagId FROM Tags s WHERE s.tagName =?1")
    Long getTagsByName(String name);
}