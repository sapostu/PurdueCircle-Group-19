package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.backendspringboot.model.Reaction;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

}