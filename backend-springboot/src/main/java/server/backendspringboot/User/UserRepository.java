package server.backendspringboot.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/* Contains the queries to the database */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    @Query("SELECT s FROM User s WHERE s.email =?1")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT s FROM User s WHERE s.username = ?1")
    Optional<User> findUserByUsername(String username);

    @Query("SELECT s FROM User s WHERE s.id = ?1")
    Optional<User> findUserById(Long id);
}
