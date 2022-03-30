package server.backendspringboot.model;

import server.backendspringboot.controller.PostController;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
public class Post {
    @Id
    @Column(name = "post_id")
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

    @Lob
    @Column(name = "bio", columnDefinition = "VARCHAR(281)")
    private String bio;

    @Column(name = "tag_id", columnDefinition = "LONG")
    private long tag_id;

    @Transient
    private String tagName;


    @Column(name = "name", columnDefinition = "VARCHAR(15)")
    private String username;

    public Post(long postId, long accountId, Date dateOfPost, String bio, String type, int isAnon, String tagName, String username) {

        super();
        this.postId = postId;
        this.accountId = accountId;
        this.dateOfPost = dateOfPost;
        this.type = type;
        this.isAnon = isAnon;
        this.bio = bio;
        this.tagName = tagName;

        this.username = username;

       /* if (tagName != null) {
            System.out.println("null!");
            PostController pc = new PostController();
            this.tag_id = pc.getTagId(tagName);
            System.out.println(this.tag_id + "\n\n");
        } else {
            System.out.println("not null!");
            this.tag_id = -1;
            System.out.println(this.tag_id + "\n\n");
        } */
    }

    /*public Post(long accountId, Date dateOfPost, String bio, String type, int isAnon) {
        super();
        this.accountId = accountId;
        this.dateOfPost = dateOfPost;
        this.type = type;
        this.isAnon = isAnon;
        this.bio = bio;
    } */

    public Post() {

    }

    public long getPostId() {
        return postId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public long getTag_id() {
        return tag_id;
    }

    public void setTag_id(long tag_id) {
        this.tag_id = tag_id;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
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
