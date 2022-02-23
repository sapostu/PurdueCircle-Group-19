package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import server.backendspringboot.model.Tags;

public interface TagsRepository extends JpaRepository<Tags, Long> {

    @Query("SELECT s FROM Tags s WHERE s.tagName =?1")
    Tags getTagsByTagName(String tagName);
}
