package server.backendspringboot.model;

import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Account {
    @Id
    @Column(name = "account_id", columnDefinition = "INT")
    private int account_id;

    @Column(name = "username", columnDefinition = "VARCHAR(15)")
    private String username;

    @Column(name = "first_name", columnDefinition = "VARCHAR(65)")
    private String first_name;

    @Column(name = "last_name", columnDefinition = "VARCHAR(32)")
    private String last_name;

    @Column(name = "email", columnDefinition = "VARCHAR(32)")
    private String email;

    @Column(name = "date_of_birth", columnDefinition = "VARCHAR(32)")
    private String date_of_birth;

    @Column(name = "crypt_password", columnDefinition = "VARCHAR(100)")
    private String crypt_password;

    @Lob
    @Column(name="bio", length=512, columnDefinition = "LONGTEXT")
    private String bio;

    @Lob
    @Column(name = "profile_pic", columnDefinition = "BLOB")
    private Blob profile_pic;


    public Account() {
    }

    public Account(int account_id, String username, String first_name, String last_name, String email, String date_of_birth, String crypt_password, 
            String bio, Blob profile_pic) {

        super();
        this.account_id = account_id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.date_of_birth = date_of_birth;
        this.crypt_password = crypt_password;
        this.bio = bio;
        this.profile_pic = profile_pic;
    }


    public int getAccount_id() {
        return this.account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirst_name() {
        return this.first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return this.last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDate_of_birth() {
        return this.date_of_birth;
    }

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getCrypt_password() {
        return this.crypt_password;
    }

    public void setCrypt_password(String crypt_password) {
        this.crypt_password = crypt_password;
    }

    public String getBio() {
        return this.bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Blob getProfile_pic() {
        return this.profile_pic;
    }

    public void setProfile_pic(Blob profile_pic) {
        this.profile_pic = profile_pic;
    }


}
