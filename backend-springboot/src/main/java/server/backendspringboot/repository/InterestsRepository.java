package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.Interests;

import javax.transaction.Transactional;
import java.util.List;

public interface InterestsRepository extends JpaRepository<Interests, Long> {

    @Query("SELECT s FROM Interests s WHERE s.account_id = ?1")
    List<Interests> getByAccount_id(int accountId);

    @Query("SELECT s FROM Interests s WHERE s.account_id = ?1 AND s.tag_id = ?2")
    Interests getInterestsByAccount_idAndTag_id(int accountId, Long tagId);

    @Query(value = "SELECT tags.tag_name as name, interests.* FROM interests INNER JOIN tags ON tags.tag_id=interests.tag_id WHERE interests.account_id = ?1", nativeQuery = true)
    List<Interests> getTagNamesByAccount_id(int accountId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Interests s WHERE s.account_id = ?1 AND s.tag_id = ?2")
    void deleteInterestsByAccountIdandTagID(int accountId, long tagId);
}
