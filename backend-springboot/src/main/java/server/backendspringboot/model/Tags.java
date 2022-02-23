package server.backendspringboot.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long tagId;

    @Column(name = "tag_name", columnDefinition = "VARCHAR(15)")
    private String tagName;

    public Tags(String tagName) {
        this.tagName = tagName;
    }

    public Tags(Long tagId, String tagName) {
        this.tagId = tagId;
        this.tagName = tagName;
    }

    public Tags() {

    }

    public Long getTagId() {
        return tagId;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }


}

