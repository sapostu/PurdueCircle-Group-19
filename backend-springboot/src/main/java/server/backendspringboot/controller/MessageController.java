package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.backendspringboot.repository.MessageRepository;
import server.backendspringboot.model.Message;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController { 

    @Autowired
    private MessageRepository messageRepository;

    @GetMapping("/chat")
    public List<Message> getAllMsgsBetween2Users(@PathVariable("sender_id") long sender_id, @PathVariable("receiver_id") long receiver_id) {

        return messageRepository.getAllMessageBetween2People(sender_id, receiver_id);
    }
}
