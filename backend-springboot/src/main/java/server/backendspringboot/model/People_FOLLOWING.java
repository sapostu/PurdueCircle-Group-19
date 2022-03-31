package server.backendspringboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class People_FOLLOWING {

    @Id
    @GeneratedValue
    private long follow_id;

    @Column
    private long account_id;

    @Column
    private long followed;

    public People_FOLLOWING() {
    }

    public People_FOLLOWING(long account_id, long followed) {
        this.account_id = account_id;
        this.followed = followed;
    }

    public long getFollow_id() {
        return follow_id;
    }

    public void setFollow_id(long follow_id) {
        this.follow_id = follow_id;
    }

    public long getAccount_id() {
        return account_id;
    }

    public void setAccount_id(long account_id) {
        this.account_id = account_id;
    }

    public long getFollowed() {
        return followed;
    }

    public void setFollowed(long followed) {
        this.followed = followed;
    }

    @Override
    public String toString() {
        return "People_FOLLOWING{" +
                "follow_id=" + follow_id +
                ", account_id=" + account_id +
                ", followed=" + followed +
                '}';
    }
}
