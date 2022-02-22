package server.backendspringboot.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "comment_sequence")
    private long commentId;

    @Column(name = "account_id", columnDefinition = "LONG")
    private long accountId;

    @Column(name = "post_id", columnDefinition = "LONG")
    private long postId;

    @Column(name = "text", columnDefinition = "VARCHAR(281)")
    private String text;

    @Column(name = "date")
    private Date date;

    public Comment(long commentId, long accountId, long postId, String text, Date date) {
        this.commentId = commentId;
        this.accountId = accountId;
        this.postId = postId;
        this.text = text;
        this.date = date;
    }

    public Comment() {

    }

    public long getCommentId() {
        return commentId;
    }

    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "commentId=" + commentId +
                ", accountId=" + accountId +
                ", postId=" + postId +
                ", text='" + text + '\'' +
                ", date=" + date +
                '}';
    }
}