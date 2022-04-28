package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import server.backendspringboot.model.Message;
import java.util.List;

import javax.transaction.Transactional;

public interface MessageRepository extends JpaRepository<Message, Integer> { 


    /* The query below will return */

    // @Query("SELECT sender_username, msg FROM message WHERE ( sender_id = ?1 OR sender_id = ?2 )")
    // List<Message> getAllMessageBetween2People(long person1_id, long person2_id);

    @Query(value = "SELECT * FROM message WHERE ((sender_id = ?1 AND receiver_id = ?2) OR (sender_id = ?2 AND receiver_id = ?1))", 
            nativeQuery = true)
    List<Message> getChat(long id1, long id2);

    @Query(value = "SELECT DISTINCT sender_id FROM message WHERE receiver_id=?1 AND sender_id<>?1", nativeQuery = true)
    List<Long> getAllChats1(long id);

    @Query(value = "SELECT DISTINCT receiver_id FROM message WHERE sender_id=?1 AND receiver_id<>?1", nativeQuery = true)
    List<Long> getAllChats2(long id);

    /* This is the query to create message. Idk if it is need tho, just added just in case */

    // @Transactional
    // @Modifying
    // @Query("INSERT INTO `PurdueCircle-MASTER`.`Message` (`sender_username`, `sender_id`, `receiver_id`, `msg`) VALUES (?1, ?2, ?3, ?4);")


}
