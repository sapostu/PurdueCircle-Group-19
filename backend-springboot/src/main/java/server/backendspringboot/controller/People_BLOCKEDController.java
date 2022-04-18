package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.Account;
import server.backendspringboot.model.People_BLOCKED;
import server.backendspringboot.repository.AccountRepository;
import server.backendspringboot.repository.People_BLOCKEDRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/blocked")
public class People_BLOCKEDController {

    @Autowired
    private People_BLOCKEDRepository people_blockedRepository;

    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/addBlock")
    public People_BLOCKED addBlock(@RequestBody People_BLOCKED people_blocked) {
        People_BLOCKED exists = people_blockedRepository.getPeople_BLOCKEDByAccount_idAndBlocked(people_blocked.getAccount_id(), people_blocked.getBlocked()).orElse(null);
        if (exists == null) {
            people_blockedRepository.save(people_blocked);
            return people_blocked;
        } else {
            return null;
        }
    }

    @PostMapping("/checkBlock")
    public boolean checkBlock(@RequestBody People_BLOCKED people_blocked) {
        People_BLOCKED exists = people_blockedRepository.getPeople_BLOCKEDByAccount_idAndBlocked(people_blocked.getAccount_id(), people_blocked.getBlocked()).orElse((null));
        return exists != null;
    }

    @PostMapping("/deleteBlock")
    public People_BLOCKED deleteBlock(@RequestBody People_BLOCKED block) {
        People_BLOCKED exists = people_blockedRepository.getPeople_BLOCKEDByAccount_idAndBlocked(block.getAccount_id(), block.getBlocked()).orElse((null));
        if (exists == null) {
            return null;
        } else {
            people_blockedRepository.delete(exists);
            return block;
        }
    }
    @GetMapping("/getBlockingById/{accountId}")
    public List<String> getAccountsBlocked(@PathVariable("accountId") Long accountId) {
        List<Long> ids = people_blockedRepository.getByAccount(accountId);
        if (ids == null || ids.size() == 0) {
            return null;
        }

        ArrayList<String> usernames = new ArrayList<>();
        for (Long id : ids) {
            int int_id = Math.toIntExact(id);
            Account account = accountRepository.findById(int_id).orElse(null);
            if (account == null) {
                continue;
            }
            usernames.add(account.getUsername());

        }
        return usernames;
    }

    @GetMapping("/getAccountBlockingById/{accountId}")
    public List<Long> getBlockers(@PathVariable("accountId") Long accountId) {
        return people_blockedRepository.getPeople_BLOCKEDByAccount_id(accountId);
    }

    @GetMapping("/getBlockingIds/{accountId}")
    public List<Long> getAccountIdBlocked(@PathVariable("accountId") Long accountId) {
        return people_blockedRepository.getByAccount(accountId);
    }


}
