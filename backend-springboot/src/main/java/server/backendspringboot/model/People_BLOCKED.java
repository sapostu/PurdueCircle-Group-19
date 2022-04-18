package server.backendspringboot.model;

import javax.persistence.*;

@Entity
//@Table(name = "people_BLOCKED")
public class People_BLOCKED {

    @Id
    @GeneratedValue
    private long block_id;

    @Column/*(name = "account_id")*/
    private long account_id;

    @Column/*(name = "blocked")*/
    private long blocked;

    //@Column(name = "blocked_username", columnDefinition = "VARCHAR(15)")
    @Transient
    private String blocked_username;

    public People_BLOCKED() {
    }

    public People_BLOCKED(long account_id, long blocked, String blocked_username) {
        this.account_id = account_id;
        this.blocked = blocked;
        this.blocked_username = blocked_username;
    }

    public long getBlock_id() {
        return block_id;
    }

    public void setBlock_id(long block_id) {
        this.block_id = block_id;
    }

    public long getAccount_id() {
        return account_id;
    }

    public void setAccount_id(long account_id) {
        this.account_id = account_id;
    }

    public long getBlocked() {
        return blocked;
    }

    public void setBlocked(long blocked) {
        this.blocked = blocked;
    }

    public String getBlocked_username() {
        return blocked_username;
    }

    public void setBlocked_username(String blocked_username) {
        this.blocked_username = blocked_username;
    }
}
