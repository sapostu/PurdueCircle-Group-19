package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import server.backendspringboot.repository.AccountRepository;
import server.backendspringboot.repository.MessageRepository;
import server.backendspringboot.model.Message;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController { 

    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private AccountRepository accountRepository;

    // @GetMapping("/chat")
    // public List<Message> getAllMsgsBetween2Users(@PathVariable("sender_id") long sender_id, @PathVariable("receiver_id") long receiver_id) {

    //     return messageRepository.getAllMessageBetween2People(sender_id, receiver_id);
    // }

    // get chat by ids
    @GetMapping("/chat/{id1}/{id2}")
    public List<Message> getChat(@PathVariable("id1") long id1, @PathVariable("id2") long id2) {
        return messageRepository.getChat(id1, id2);
    }

    // get chat by usernames
    @GetMapping("/chatUser/{user1}/{user2}")
    public List<Message> getChat(@PathVariable("user1") String user1, @PathVariable("user2") String user2) {
        long id1 = accountRepository.getAccountByUsername(user1).getAccount_id();
        long id2 = accountRepository.getAccountByUsername(user2).getAccount_id();
        System.out.println(id1 + " " + id2);
        return messageRepository.getChat(id1, id2);
    }

    // add message
    @PostMapping("/add")
    public void addMessage(@RequestBody Message msg ) {
        messageRepository.save(msg);
    }

    // add message by usernames
    /**
     * {
     *      sender: 
     *      receiver: 
     *      msg: 
     * }
     */
    @PostMapping("/addByUser")
    public Message addMessageByUser(@RequestBody Map<String,String> map) {
        long id1 = accountRepository.getAccountByUsername(map.get("sender")).getAccount_id();
        long id2 = accountRepository.getAccountByUsername(map.get("receiver")).getAccount_id();
        Message msg = new Message();
        msg.setMsg(map.get("msg"));
        msg.setSender_id(id1);
        msg.setReceiver_id(id2);
        msg.setSender_username(map.get("sender"));
        return messageRepository.save(msg);
    }

}
