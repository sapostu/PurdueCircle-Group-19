package server.backendspringboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Interests {

    @Id
    private long interest_id;

    @Column(name = "account_id")
    private int account_id;

    @Column(name = "tag_id")
    private Long tag_id;

    public Interests(int account_id, Long tag_id) {
        this.account_id = account_id;
        this.tag_id = tag_id;
    }

    public Interests() {

    }

    public long getInterest_id() {
        return interest_id;
    }

    public void setInterest_id(long interest_id) {
        this.interest_id = interest_id;
    }

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public Long getTag_id() {
        return tag_id;
    }

    public void setTag_id(Long tag_id) {
        this.tag_id = tag_id;
    }


}