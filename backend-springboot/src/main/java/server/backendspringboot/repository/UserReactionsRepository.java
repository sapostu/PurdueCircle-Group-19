package server.backendspringboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import server.backendspringboot.model.UserReaction;

@Transactional
public interface UserReactionsRepository extends JpaRepository<UserReaction, Long> {
    
    @Query("SELECT s FROM UserReaction s WHERE s.postId = ?1")
    List<UserReaction> getReactionsByPostId(long postId);

    @Query("SELECT s FROM UserReaction s WHERE s.accountId = ?1 AND s.postId = ?2")
    UserReaction getReactionByAccountIdAndPostId(long accountId, long postId);

    @Query("SELECT COUNT(s) FROM UserReaction s WHERE s.postId = ?1 AND s.reactionId = ?2")
    int countReactionsByPostIdAndReactionId(long postId, long reactionId);

    @Query(value = "SELECT reactions.reaction_name as name, user_reactions.* FROM user_reactions INNER JOIN reactions ON user_reactions.reaction_id=reactions.reaction_id WHERE user_reactions.account_id = ?1", nativeQuery = true)
    List<UserReaction> getReactionsByAccountId(int accountId);

    @Modifying
    @Query("DELETE FROM UserReaction s WHERE s.postId = ?1")
    void deleteUserReactionsByPostId(long postId);
}
