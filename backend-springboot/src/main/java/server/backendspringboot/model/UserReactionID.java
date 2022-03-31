package server.backendspringboot.model;

import java.io.Serializable;
import java.util.Objects;

// Composite ID for UserReaction
public class UserReactionID implements Serializable {
    private long postId;
    private long accountId;

    public UserReactionID() {}

    public UserReactionID(long postId, long accountId) {
        this.postId = postId;
        this.accountId = accountId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) { return true; }
        if (o == null || getClass() != o.getClass()) { return false; }
        UserReactionID userReactionID = (UserReactionID) o;
        return postId == userReactionID.postId && accountId == userReactionID.accountId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, accountId);
    }
}
