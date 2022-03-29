package server.backendspringboot.model;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@Table
public class Reaction {
    @Id
    @Column(name = "reaction_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long reactionId;

    @Column(name = "reaction_name")
    private String reactionName;

    public Reaction(long reactionId, String reactionName) {
        super();
        this.reactionId = reactionId;
        this.reactionName = reactionName;
    }

    public Reaction() {}

    public long getReactionId() {
        return reactionId;
    }

    public String getReactionName() {
        return reactionName;
    }

    public void setReactionId(long reactionId) {
        this.reactionId = reactionId;
    }

    public void setReactionName(String reactionName) {
        this.reactionName = reactionName;
    }
}
