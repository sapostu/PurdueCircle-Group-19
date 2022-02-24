package server.backendspringboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import server.backendspringboot.model.Account;
import server.backendspringboot.repository.AccountRepository;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/signup")
    public Account createAccount(@RequestBody Account _account) {
        //TODO: process POST request

        
        return accountRepository.save(_account);
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
    
}
