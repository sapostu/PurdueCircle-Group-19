package server.backendspringboot.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import server.backendspringboot.model.posts_saved;
import server.backendspringboot.repository.Posts_SavedRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class SavedControllerTest {

    @Autowired
    Posts_SavedRepository psr;

    /*
    * Tests that database query for posts saved by a specific user returns the correct posts only
    */
    @Test
    void testAddSave() {
        posts_saved new_post =  new posts_saved(10, 5, 6);
        psr.save(new_post);
        posts_saved new_post2 = new posts_saved(11, 5, 7);
        psr.save(new_post2);
        posts_saved new_post3 = new posts_saved(12, 6, 9);
        psr.save(new_post3);
        List<posts_saved> saved = psr.getPostsSavedByAccountId(5L);
        boolean same = saved.size() == 2;
        ArrayList<posts_saved> newPosts = new ArrayList<>();
        newPosts.add(new_post);
        newPosts.add(new_post2);
        for (server.backendspringboot.model.posts_saved posts_saved : saved) {
            newPosts.removeIf(newPost -> posts_saved.getAccount_id() == newPost.getAccount_id() && posts_saved.getPost_id() == newPost.getPost_id());
        }

        assertTrue(same && newPosts.size() == 0);
    }

    /*
    * Tests deleting the post save
     */
    @Test
    void testUnSave() {
        posts_saved new_post = new posts_saved(1, 2, 3);
        psr.save(new_post);
        psr.unsavePost(new_post.getAccount_id(), new_post.getPost_id());
        List<posts_saved> saved = psr.getPostsSavedByAccountId(new_post.getAccount_id());
        assertEquals(0, saved.size());

    }

    /*
    * Tests checking for duplicate saves.
     */
    @Test
    void testDuplicate() {
        psr.save(new posts_saved(1, 2, 3));
        psr.save(new posts_saved(2, 2, 3));
        psr.save(new posts_saved(3, 2,  4));
        assertEquals(2, psr.getDuplicates(2L, 3L).size());
    }
}
