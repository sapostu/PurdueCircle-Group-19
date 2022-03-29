package server.backendspringboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import server.backendspringboot.model.UserReaction;

public interface UserReactionsRepository extends JpaRepository<UserReaction, Long> {
    
    @Query("SELECT s FROM UserReaction s WHERE s.postId = ?1")
    List<UserReaction> getReactionsByPostId(long postId);

    @Query("SELECT s FROM UserReaction s WHERE s.accountId = ?1 AND s.postId = ?2")
    UserReaction getReactionByAccountIdAndPostId(long accountId, long postId);
}
