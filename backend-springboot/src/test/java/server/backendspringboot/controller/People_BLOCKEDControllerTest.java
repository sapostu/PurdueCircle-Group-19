package server.backendspringboot.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import server.backendspringboot.model.People_BLOCKED;

import server.backendspringboot.repository.AccountRepository;
import server.backendspringboot.repository.People_BLOCKEDRepository;
import server.backendspringboot.repository.People_FOLLOWINGRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.List;

import javax.transaction.Transactional;

@DataJpaTest
@ExtendWith(SpringExtension.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@SpringBootTest
@Transactional
public class People_BLOCKEDControllerTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    People_BLOCKEDRepository people_blockedRepository;

    @Autowired
    AccountRepository accountRepository;


    @Test
    void testDeleteBlock() {
        People_BLOCKED exists = people_blockedRepository.getPeople_BLOCKEDByAccount_idAndBlocked(61L, 62L).orElse((null));
        people_blockedRepository.delete(exists);
        People_BLOCKED stillExists = people_blockedRepository.getPeople_BLOCKEDByAccount_idAndBlocked(61L, 62L).orElse((null));
        assertNotEquals(exists, null);
        assertEquals(stillExists, null);
    }

    @Test
    void testGetAccountsBlocked() {
        List<Long> actual = people_blockedRepository.getByAccount(61L);
        List<Long> expected = List.of(62L, 65L);
        assertEquals(expected, actual);
    }

    @Test
    void testAddBlock() {
        //People_BLOCKED
        List<Long> actual1 = people_blockedRepository.getByAccount(61L);
        List<Long> expected1 = List.of(62L, 65L);
        People_BLOCKED exists = new People_BLOCKED(61L, 58L, null);
        people_blockedRepository.save(exists);
        List<Long> actual = people_blockedRepository.getByAccount(61L);
        List<Long> expected = List.of(62L, 65L, 58L);
        assertEquals(expected, actual);
        assertEquals(expected1, actual1);
    }

    @Test
    void testCheckBlock() {
        People_BLOCKED exists = people_blockedRepository.getPeople_BLOCKEDByAccount_idAndBlocked(61L, 65L).orElse((null));
        assertNotEquals(exists, null);
        assertEquals(61L, exists.getAccount_id());
        assertEquals(65L, exists.getBlocked());
    }
}
