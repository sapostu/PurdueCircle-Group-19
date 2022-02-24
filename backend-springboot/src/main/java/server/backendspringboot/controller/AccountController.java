package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import server.backendspringboot.model.Account;
import server.backendspringboot.repository.AccountRepository;
import server.backendspringboot.repository.PostRepository;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    PostController pc;

    @PostMapping("/signup")
    public Account createAccount(@RequestBody Account _account) {
        //TODO: process POST request

        
        return accountRepository.save(_account);
    }

    @PostMapping("/login")
    public Account login(@RequestBody Account account) {
        System.out.println(account.getUsername());
        System.out.println(account.getCrypt_password());
        System.out.println("\n\n\n");
        System.out.println(accountRepository.getAccountByUsernameAndCrypt_password(account.getUsername(), account.getCrypt_password()) != null
        || accountRepository.getAccountByEmailAndCrypt_password(account.getUsername(), account.getCrypt_password()) != null);
        Account user = accountRepository.getAccountByUsernameAndCrypt_password(account.getUsername(),account.getCrypt_password());
        Account email = accountRepository.getAccountByEmailAndCrypt_password(account.getUsername(), account.getCrypt_password());
        if (user != null) {

            return user;
        }

        if (email != null) {
            return email;
        }

        return null;
    }

    @GetMapping("/allAccounts")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @GetMapping("/getAccountbyID/{account_id}")
    public Account getAccountById(@PathVariable int account_id) {
        return accountRepository.findById(account_id).orElseThrow(() ->
                new IllegalStateException("No account with id " + account_id));
    }

    @GetMapping("/getByUsername/{username}")
    public Account getAccountByUsername(@PathVariable String username) {
        return accountRepository.getAccountByUsername(username);
    }

    @DeleteMapping("/deleteById/{account_id}")
    public void deleteById(@PathVariable int account_id) {
        accountRepository.deleteById(account_id);
    }

    @DeleteMapping("/deleteByUsername/{username}")
    public Account deleteByUsername(@PathVariable String username) {
        Account toDel = accountRepository.getAccountByUsername(username);
        accountRepository.delete(toDel);
        return toDel;
    }

    @PostMapping("/delete")
    public void deleteAccount(@RequestBody Account account) {
        System.out.println("\n\n Deleting account");
        Account toDel = accountRepository.getAccountByUsername(account.getUsername());
        if (toDel == null) {
            return;
        }
        pc.deleteByAccountId(toDel.getAccount_id());
        accountRepository.delete(toDel);

    }
    
}
