package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import server.backendspringboot.model.Message;
import java.util.List;

import javax.transaction.Transactional;

public interface MessageRepository extends JpaRepository<Message, Integer> { 


    /* The query below will return */

    @Query("SELECT sender_username, msg FROM Message WHERE ( sender_id = ?1 OR sender_id = ?2 )")
    List<Message> getAllMessageBetween2People(long person1_id, long person2_id);



    /* This is the query to create message. Idk if it is need tho, just added just in case */

    // @Transactional
    // @Modifying
    // @Query("INSERT INTO `PurdueCircle-MASTER`.`Message` (`sender_username`, `sender_id`, `receiver_id`, `msg`) VALUES (?1, ?2, ?3, ?4);")


}
