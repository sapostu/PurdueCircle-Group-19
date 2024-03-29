package server.backendspringboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "UserReactions")
@IdClass(UserReactionID.class)
public class UserReaction {
    @Id
    @Column(name = "post_id")
    private long postId;

    @Id
    @Column(name = "account_id")
    private long accountId;

    @Column(name = "reaction_id")
    private long reactionId;

    @Column(name = "name")
    private String name;
    

    public UserReaction() {}

    public UserReaction(long postId, long accountId, long reactionId, String name) {
        this.postId = postId;
        this.accountId = accountId;
        this.reactionId = reactionId;
        this.name = name;
    }

    public UserReaction(long postId, long accountId, long reactionId) {
        this.postId = postId;
        this.accountId = accountId;
        this.reactionId = reactionId;
        this.name = null;
    }

    public long getPostId() {
        return this.postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public long getAccountId() {
        return this.accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public long getReactionId() {
        return this.reactionId;
    }

    public void setReactionId(long reactionId) {
        this.reactionId = reactionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
