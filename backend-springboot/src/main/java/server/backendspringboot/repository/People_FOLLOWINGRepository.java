package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.People_FOLLOWING;

import java.util.List;
import java.util.Optional;

public interface People_FOLLOWINGRepository extends JpaRepository<People_FOLLOWING, Long> {

    @Query("SELECT s FROM People_FOLLOWING s WHERE s.account_id = ?1 AND s.followed = ?2")
    Optional<People_FOLLOWING> getByAccountIdandFollowed(long accountId, long followed);

    @Query("SELECT s.followed FROM People_FOLLOWING s WHERE s.account_id = ?1")
    List<Long> getByAccount(long accountId);
    //@Query(value = "SELECT account.username as name, post.* FROM post INNER JOIN account ON post.account_id=account.account_id WHERE post.tag_id = ?1", nativeQuery = true)

    @Query("SELECT s.account_id FROM People_FOLLOWING s where s.followed = ?1")
    List<Long> getFollowers(long followed);
}
