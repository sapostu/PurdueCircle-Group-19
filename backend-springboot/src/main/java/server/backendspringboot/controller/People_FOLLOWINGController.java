package server.backendspringboot.controller;

import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.People_FOLLOWING;
import server.backendspringboot.repository.People_FOLLOWINGRepository;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/following")
public class People_FOLLOWINGController {

    @Autowired
    private People_FOLLOWINGRepository people_followingRepository;

    @PostMapping("/addFollow")
    public People_FOLLOWING addFollowing(@RequestBody People_FOLLOWING people_following) {
        People_FOLLOWING exists = people_followingRepository.getByAccountIdandFollowed(people_following.getAccount_id(), people_following.getFollowed()).orElse(null);
        if (exists == null) {
            return people_followingRepository.save(people_following);
        } else {
            return null;
        }

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

    @GetMapping("/getFollowingById/{accountId}")
    public List<Long> getAccountsFollowed(@PathVariable("accountId") Long accountId) {
        return people_followingRepository.getByAccount(accountId);
    }

    @GetMapping("/getFollowersById/{accountId}")
    public List<Long> getFollowers(@PathVariable("accountId") Long accountId) {
        return people_followingRepository.getFollowers(accountId);
    }



}
