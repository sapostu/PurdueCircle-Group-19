package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import server.backendspringboot.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer>{
   
    // NOTE: this is the correct format but i don't know how to pass in args. will us springboot library to save. 
    // IF INCORRECT AND NOT USED, spring boot will not work. leave it commented unless it works for sure :)

    @Query("SELECT s FROM Account s WHERE s.username =?1")
    Account getAccountByUsername(String username);

    // @Query(
    //     value = "INSERT INTO account_info(username, email, crypt_password) VALUES (?1, ?2, ?3);",
    //     nativeQuery = true
    // )        
    // void initialAccountCreation(String username, String email, String crypt_password);
}
