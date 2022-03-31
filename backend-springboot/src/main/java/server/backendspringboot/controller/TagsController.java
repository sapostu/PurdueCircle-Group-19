package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.backendspringboot.model.Tags;
import server.backendspringboot.repository.TagsRepository;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tags")
public class TagsController {

    @Autowired
    private TagsRepository tagsRepository;


    @GetMapping("/alltags")
    public List<Tags> getAllTags() {
        return tagsRepository.findAll();
    }


    @GetMapping("/getById/{tagId}")
    public Tags getTagsById(@PathVariable long tagId) {
        return tagsRepository.findById(tagId).orElseThrow(() ->
                new IllegalStateException("Tag with id " + tagId + " does not exist!"));
    }

    @GetMapping("/getByName/{tagName}")
    public Tags getTagsByTagName(@PathVariable String tagName) {
        return tagsRepository.getTagsByTagName(tagName);
    }

    @PostMapping("/createTag")
    public Tags addTags(@RequestBody Tags tags) {
        if (tagsRepository.getTagsByTagName(tags.getTagName()) != null) {
            throw new IllegalStateException("Tag with name " + tags.getTagName() + " already exists!");
        }
        tagsRepository.save(tags);
        return tags;
    }

    @DeleteMapping("/deleteTagbyID/{tagId}")
    public Tags deleteTagsById(@PathVariable long tagId) {
        Tags toDel = tagsRepository.findById(tagId).orElseThrow(() ->
                new IllegalStateException("No tag with id " + tagId + " exists!"));
        tagsRepository.deleteById(tagId);
        return toDel;
    }

    @PostMapping("/deleteTag")
    public Tags deleteTags(@RequestBody Tags tags) {
        Tags toDel = tagsRepository.findById(tags.getTagId()).orElseThrow(() ->
                new IllegalStateException(("No tag with id " + tags.getTagId() + " exists!")));
        Tags toDel2 = tagsRepository.getTagsByTagName(tags.getTagName());
        if (toDel2 != null && toDel == toDel2) {
            tagsRepository.deleteById(toDel.getTagId());
            return toDel;
        } else {
            return null;
        }
    }

}
