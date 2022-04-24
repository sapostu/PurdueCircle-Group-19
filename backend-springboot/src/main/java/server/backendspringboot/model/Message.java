package server.backendspringboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Message {
    
    @Id
    @Column(name = "msg_id", columnDefinition = "INT")
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

 



}
