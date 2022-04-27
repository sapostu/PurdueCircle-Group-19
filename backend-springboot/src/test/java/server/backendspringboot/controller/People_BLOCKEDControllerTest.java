package server.backendspringboot.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import server.backendspringboot.model.People_BLOCKED;

import server.backendspringboot.repository.AccountRepository;
import server.backendspringboot.repository.People_BLOCKEDRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.List;

import javax.transaction.Transactional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class People_BLOCKEDControllerTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    People_BLOCKEDRepository people_blockedRepository;

    @Autowired
    AccountRepository accountRepository;

    People_BLOCKEDController PBC;

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
}
