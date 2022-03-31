package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.Interests;
import server.backendspringboot.model.Tags;
import server.backendspringboot.repository.InterestsRepository;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/interests")
public class InterestsController {

    @Autowired
    private InterestsRepository interestsRepository;

    @GetMapping("/tagsByAccountId/{accountId}")
    List<Interests> getTagsById(@PathVariable("accountId") Long id) {
        return interestsRepository.getByAccount_id(Math.toIntExact(id));
    }

    @PostMapping("/addInterests")
    Interests addInterest(@RequestBody Interests interest) {
        interestsRepository.save(interest);
        return interest;
    }

    @PostMapping("/deleteInterests")
    Interests deleteInterest(@RequestBody Interests interests) {
        Interests toDel = interestsRepository.getInterestsByAccount_idAndTag_id(interests.getAccount_id(), interests.getTag_id());
        System.out.println(toDel.getAccount_id() +  " " + toDel.getTag_id() + " " + toDel.getInterest_id());
       interestsRepository.delete(toDel);
        interestsRepository.deleteInterestsByAccountIdandTagID(toDel.getAccount_id(), toDel.getAccount_id());
        return toDel;
    }

    @PostMapping("/checkInterests")
    public boolean checkInt(@RequestBody Interests interest) {
        Interests interests = interestsRepository.getInterestsByAccount_idAndTag_id( interest.getAccount_id(), interest.getTag_id());
        return interests != null;
    }
}
