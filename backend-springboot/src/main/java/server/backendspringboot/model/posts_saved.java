package server.backendspringboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class posts_saved {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "saved_post_id", columnDefinition = "INT")
    private long saved_post_id;

    @Column(name = "account_id", columnDefinition = "INT")
    private long account_id;

    @Column(name = "post_id", columnDefinition = "INT")
    private long post_id;


    public posts_saved() {
    }


    public posts_saved(long saved_post_id, long account_id, long post_id) {
        this.saved_post_id = saved_post_id;
        this.account_id = account_id;
        this.post_id = post_id;
    }

    public long getSaved_post_id() {
        return this.saved_post_id;
    }

    public void setSaved_post_id(long saved_post_id) {
        this.saved_post_id = saved_post_id;
    }

    public long getAccount_id() {
        return this.account_id;
    }

    public void setAccount_id(long account_id) {
        this.account_id = account_id;
    }

    public long getPost_id() {
        return this.post_id;
    }

    public void setPost_id(long post_id) {
        this.post_id = post_id;
    }

}
