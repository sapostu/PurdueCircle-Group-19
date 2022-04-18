package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.People_BLOCKED;

import java.util.List;
import java.util.Optional;

public interface People_BLOCKEDRepository extends JpaRepository<People_BLOCKED, Long> {

    @Query("SELECT s FROM People_BLOCKED s WHERE s.account_id = ?1 AND s.blocked = ?2")
    Optional<People_BLOCKED> getPeople_BLOCKEDByAccount_idAndBlocked(long accountId, long blocked);

    @Query("SELECT s.blocked FROM People_BLOCKED s WHERE s.account_id = ?1")
    List<Long> getByAccount(long accountId);

    @Query("SELECT s.account_id FROM People_BLOCKED s WHERE s.blocked = ?1")
    List<Long> getPeople_BLOCKEDByAccount_id(long blocked);
}
