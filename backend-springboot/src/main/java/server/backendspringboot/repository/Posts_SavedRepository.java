package server.backendspringboot.repository;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import server.backendspringboot.model.posts_saved;

@Transactional
public interface Posts_SavedRepository extends JpaRepository<posts_saved, Long> { 

    @Query(value = "SELECT * FROM posts_saved WHERE account_id =?1", nativeQuery = true)
    List<posts_saved> getPostsSavedByAccountId(Long account_id);

    // @Transactional
    // @Modifying
    // @Query("INSERT INTO `PurdueCircle-MASTER`.`post_saved` (`account_id`, `post_id`) VALUES (?1, ?2);", nativeQuery = true)

}