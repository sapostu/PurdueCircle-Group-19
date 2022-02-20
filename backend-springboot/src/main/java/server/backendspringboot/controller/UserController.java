package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/* API Layer that directly interacts with front end */

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    // private final UserService userService;

    // /* Dependency injection - userService should be autowired */
    // @Autowired
    // public UserController(UserService userService) {
    //     this.userService = userService;
    // }

    // /*
    // Returns entire list of users
    //  */
    // @GetMapping
    // public List<User> getUsers() {
    //     return userService.getUsers();
    // }

    // /*
    // Returns user of the given ID if it exists
    //  */
    // @GetMapping(path = "{userId}")
    // public User getUserById(@PathVariable("userId") Long userId) {
    //     return userService.getUserById(userId);
    // }


    // /*
    // Takes in a User object and writes it to the database
    //  */
    // @PostMapping
    // public void registerNewUser(@RequestBody User user) {
    //     userService.addNewUser(user);
    // }

    // /*
    // Deletes the corresponding user to the given ID if it exists
    //  */
    // @DeleteMapping(path = "{userId}")
    // public void deleteUser(@PathVariable("userId") Long userId) {
    //     userService.deleteUser(userId);
    // }

    // /*
    // Edits a user's email, bio, and/or password
    //  */
    // @PutMapping(path = "{userId}")
    // public void updateUser(@PathVariable("userId") Long userId, @RequestParam(required = false) String email,
    //                        @RequestParam(required = false) String bio, @RequestParam(required = false) String password) {
    //     userService.updateUser(userId, email, bio, password);
    // }
}
