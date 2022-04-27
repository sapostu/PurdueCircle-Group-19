package server.backendspringboot.controller;

import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.Account;
import server.backendspringboot.model.People_FOLLOWING;
import server.backendspringboot.repository.AccountRepository;
import server.backendspringboot.repository.People_FOLLOWINGRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/following")
public class People_FOLLOWINGController {

    @Autowired
    private People_FOLLOWINGRepository people_followingRepository;

    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/addFollow")
    public People_FOLLOWING addFollowing(@RequestBody People_FOLLOWING people_following) {
        People_FOLLOWING exists = people_followingRepository.getByAccountIdandFollowed(people_following.getAccount_id(), people_following.getFollowed()).orElse(null);
        if (exists == null) {
            return people_followingRepository.save(people_following);
        } else {
            return null;
        }

    }

    @PostMapping("/checkFollow")
    public boolean checkFollowing(@RequestBody People_FOLLOWING check) {
        People_FOLLOWING exists = people_followingRepository.getByAccountIdandFollowed(check.getAccount_id(), check.getFollowed()).orElse(null);
        return exists != null;

    }

    @PostMapping("/deleteFollow")
    public People_FOLLOWING deleteFollowing(@RequestBody People_FOLLOWING toDel) {
        People_FOLLOWING exists = people_followingRepository.getByAccountIdandFollowed(toDel.getAccount_id(), toDel.getFollowed()).orElse(null);
        if (exists == null) {
            return null;
        } else {
            people_followingRepository.delete(exists);
            return toDel;
        }
    }
    @GetMapping("/getFollowingIdById/{accountId}")
    public List<Long> getAccountsIdFollowed(@PathVariable("accountId") Long accountId) {
        return people_followingRepository.getByAccount(accountId);
    }

    @GetMapping("/getFollowingById/{accountId}")
    public List<String> getAccountsFollowed(@PathVariable("accountId") Long accountId) {
        List<Long> ids =  people_followingRepository.getByAccount(accountId);
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

    @GetMapping("/getFollowersById/{accountId}")
    public List<Long> getFollowers(@PathVariable("accountId") Long accountId) {
        return people_followingRepository.getFollowers(accountId);
    }



}
