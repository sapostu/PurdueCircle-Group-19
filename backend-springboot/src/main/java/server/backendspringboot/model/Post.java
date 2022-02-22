package server.backendspringboot.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class Post {
    @Id
    @Column(columnDefinition = "LONG")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long postId;

    @Column(name = "account_id", columnDefinition = "LONG")
    private long accountId;

    @Column(name = "date")
    private Date dateOfPost;

    @Column(name = "isAnonymous", columnDefinition = "INT")
    private int isAnon;

    @Column(name = "type", columnDefinition = "VARCHAR(15)")
    private String type;

    @Column(name = "bio", columnDefinition = "VARCHAR(281)")
    private String bio;


    public Post(long postId, long accountId, Date dateOfPost, String bio, String type, int isAnon) {
        super();
        this.postId = postId;
        this.accountId = accountId;
        this.dateOfPost = dateOfPost;
        this.type = type;
        this.isAnon = isAnon;
        this.bio = bio;
    }

    public Post(long accountId, Date dateOfPost, String bio, String type, int isAnon) {
        super();
        this.accountId = accountId;
        this.dateOfPost = dateOfPost;
        this.type = type;
        this.isAnon = isAnon;
        this.bio = bio;
    }

    public Post() {

    }

    public long getPostId() {
        return postId;
    }


    public long  getAccountId() {
        return accountId;
    }



    public Date getDateOfPost() {
        return dateOfPost;
    }

    public String getType() {
        return type;
    }

    public int getIsAnon() {
        return isAnon;
    }

    public void setIsAnon(int isAnon) {
        this.isAnon = isAnon;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public void setDateOfPost(Date dateOfPost) {
        this.dateOfPost = dateOfPost;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Post{" +
                "postId=" + postId +
                ", accountId=" + accountId +
                ", dateOfPost=" + dateOfPost +
                ", isAnon=" + isAnon +
                ", type='" + type + '\'' +
                ", bio='" + bio + '\'' +
                '}';
    }
}

