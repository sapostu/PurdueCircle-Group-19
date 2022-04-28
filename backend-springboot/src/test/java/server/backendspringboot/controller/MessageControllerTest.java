package server.backendspringboot.controller;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import server.backendspringboot.model.Message;
import server.backendspringboot.repository.MessageRepository;

@DataJpaTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@SpringBootTest
@Transactional
public class MessageControllerTest {

    @Autowired
    private MessageRepository messageRepository;

    @Test
    void testAddMessage() {
        Message message = new Message("userasdfa", 61L, 58L, "hello there");
        
        List<Message> messages = messageRepository.getChat(61L, 58L);
        Message[] current_messages = new Message[messages.size()];
        for(int i = 0; i < messages.size(); i++) {
            current_messages[i] = messages.get(i);
        }
        for(int i = 0; i < current_messages.length; i++) {
            assertEquals(current_messages[i].equalsNoId(message), false);
        }
        messageRepository.save(message);
        messages = messageRepository.getChat(61L, 58L);
        current_messages = new Message[messages.size()];
        for(int i = 0; i < messages.size(); i++) {
            current_messages[i] = messages.get(i);
        }
        assertEquals(current_messages[current_messages.length - 1].equalsNoId(message), true);
    }

    @Test
    void testGetChat() {
        List<Message> messages = messageRepository.getChat(61L, 58L);
        String[] actual = new String[messages.size()];
        String[] expected = {"211 userasdfa 61 58 hey", "212 user422 58 61 wassup"};
        for(int i = 0; i < messages.size(); i++) {
            actual[i] = messages.get(i).toString();
        }
        for(int i = 0; i < Math.min(actual.length, expected.length); i++) {
            //assertEquals(expected[i], actual[i]);
            assertEquals(expected[i].equals(actual[i]), true);
        }
    }
}
