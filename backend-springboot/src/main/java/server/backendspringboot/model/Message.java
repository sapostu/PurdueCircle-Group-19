package server.backendspringboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Message {
    
    @Id
    @Column(name = "msg_id", columnDefinition = "INT")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long msg_id;
    
    @Column(name = "sender_username", columnDefinition = "VARCHAR(15)")
    private String sender_username;

    @Column(name = "sender_id", columnDefinition = "INT")
    private long sender_id;

    @Column(name = "receiver_id", columnDefinition = "INT")
    private long receiver_id;

    @Column(name = "msg", columnDefinition = "VARCHAR(1000)")
    private String msg;

    public Message() {
    }


    public Message(long msg_id, String sender_username, long sender_id, long receiver_id, String msg) {
        this.msg_id = msg_id;
        this.sender_username = sender_username;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.msg = msg;
    }

    public Message(String sender_username, long sender_id, long receiver_id, String msg) {
        this.sender_username = sender_username;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.msg = msg;
    }

    public long getMsg_id() {
        return this.msg_id;
    }

    public void setMsg_id(long msg_id) {
        this.msg_id = msg_id;
    }

    public String getSender_username() {
        return this.sender_username;
    }

    public void setSender_username(String sender_username) {
        this.sender_username = sender_username;
    }

    public long getSender_id() {
        return this.sender_id;
    }

    public void setSender_id(long sender_id) {
        this.sender_id = sender_id;
    }

    public long getReceiver_id() {
        return this.receiver_id;
    }

    public void setReceiver_id(long receiver_id) {
        this.receiver_id = receiver_id;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String toString() {
        return this.msg_id + " " + this.sender_username + " " + this.sender_id + " " + this.receiver_id + " " + msg;
    }

    public Boolean equals(Message message) {
        return (message.getMsg().equals(this.msg) && message.getMsg_id() == this.msg_id && message.getSender_username().equals(this.sender_username) && message.getSender_id() == this.sender_id && message.getReceiver_id() == this.receiver_id);
    }

    public Boolean equalsNoId(Message message) {
        return (message.getMsg().equals(this.msg) && message.getSender_username().equals(this.sender_username) && message.getSender_id() == this.sender_id && message.getReceiver_id() == this.receiver_id);
    }



}
