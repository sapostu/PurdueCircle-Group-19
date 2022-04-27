package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.Post;
import server.backendspringboot.model.Interests;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT s FROM Post s WHERE s.accountId =?1")
    List<Post> getPostByAuthor(long authorId);

    @Query(value = "SELECT * FROM post JOIN account ON post.account_id=account.account_id WHERE account.username = ?1", nativeQuery = true)
    List<Post> getPostByName(String name);

    @Query(value = "SELECT account.username as name, post.* FROM post INNER JOIN account ON post.account_id=account.account_id WHERE post.tag_id = ?1", nativeQuery = true)
    List<Post> getPostByTag_id(long tagId);

    @Query(value = "SELECT t2.username as name, t1.* FROM post t1 join account t2 ON t1.account_id = t2.account_id WHERE t1.tag_id = ?1 AND t1.account_id NOT IN (SELECT s1.blocked FROM people_blocked s1 WHERE s1.account_id = ?2);", nativeQuery = true)
    List<Post> NO_BLOCKED_getPostByTag_id(long tagId, long accountId);

    @Query(value = "SELECT account.username as name, post.* FROM post INNER JOIN account ON post.account_id=account.account_id WHERE post.account_id = ?1", nativeQuery = true)
    List<Post> getPostByAccount_id(int accountId);

    @Query("SELECT s.tagId FROM Tags s WHERE s.tagName =?1")
    Long getTagsByName(String name);

    @Query("SELECT s FROM Interests s WHERE s.account_id = ?1")
    List<Interests> getFollowedTagsByAccountId(int id);

}

