package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.Interests;

import java.util.List;

public interface InterestsRepository extends JpaRepository<Interests, Long> {

    @Query("SELECT s FROM Interests s WHERE s.account_id = ?1")
    List<Interests> getByAccount_id(Long accountId);

    @Query("SELECT s FROM Interests s WHERE s.account_id = ?1 AND s.tag_id = ?2")
    Interests getInterestsByAccount_idAndTag_id(int accountId, Long tagId);
}
