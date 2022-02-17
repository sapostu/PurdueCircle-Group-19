package server.backendspringboot.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/* Service layer that implements the buisness logic of server */

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    Returns all users in the database
     */
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /*
    Returns the user in the database with a given ID.
    If a user with that ID does not exist, it throws an
    IllegalStateException
     */
    public User getUserById(Long userId) {
        return userRepository.findUserById(userId).orElseThrow(() ->
                new IllegalStateException("No user with id: " + userId + " exists!"));
    }


    /*
    Adds the given user to the database. Checks if there already exists user with
    the same username or email and throws an illegalStateException
     */
    public void addNewUser(User user) {

        /* Check if email is already taken */
        Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if (userByEmail.isPresent()) {
            throw new IllegalStateException("Email already taken!"); // Better ways to handle
        }

        /* Check if username is already taken */
        Optional<User> userByUsername = userRepository.findUserByUsername(user.getUsername());
        if (userByUsername.isPresent()) {
            throw new IllegalStateException("Username already taken!");
        }

        userRepository.save(user); // Saving user to database
        System.out.println(user);
    }

    /*
    Deletes the user with the given ID from database. If a corresponding user doesn't exist,
    then method throws an IllegalStateException
     */
    public void deleteUser(Long userId) {
       boolean exists =  userRepository.existsById(userId);
       if (!exists) {
           throw new IllegalStateException("Student with id: " + userId + " does not exist.");
       }

       userRepository.deleteById(userId);
    }

    /*
    Edits a user's (whose ID is given) email, bio, and/or password in the database if the given args
    are non-null. Throws an IllegalStateException if no such user exists in database.
     */
    @Transactional
    public void updateUser(Long userId, String email, String bio, String password) {
        boolean exists = userRepository.existsById(userId);
        if (!exists) {
            throw new IllegalStateException("Student with id: " + userId + " does not exist.");
        }

        User edit = userRepository.getById(userId);

        if (email != null && email.length() > 0) {
            edit.setEmail(email); // Change email (Haven't implemented validation checks)
        }
        if (bio != null && bio.length() > 0) {
            edit.setBio(bio); // Change bio (Haven't implemented validation checks)
        }
        if (password != null && password.length() > 0) {
            edit.setPassword(password); // change password (Haven't implemented validation checks or security)
        }
    }


}
