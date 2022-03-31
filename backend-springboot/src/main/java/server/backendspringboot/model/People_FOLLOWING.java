package server.backendspringboot.model;

import javax.persistence.*;

@Entity
public class People_FOLLOWING {

    @Id
    @GeneratedValue
    private long follow_id;

    @Column
    private long account_id;

    @Column
    private long followed;

    @Column(name = "namee", columnDefinition = "VARCHAR(15)")
    private String follow_username;

    public People_FOLLOWING() {
    }

    public People_FOLLOWING(long account_id, long followed, String follow_username) {
        this.account_id = account_id;
        this.followed = followed;
        this.follow_username = follow_username;
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

    public String getFollow_username() {
        return follow_username;
    }

    public void setFollow_username(String follow_username) {
        this.follow_username = follow_username;
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
