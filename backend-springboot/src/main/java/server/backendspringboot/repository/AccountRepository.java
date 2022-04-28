package server.backendspringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import server.backendspringboot.model.Account;

import javax.transaction.Transactional;

public interface AccountRepository extends JpaRepository<Account, Integer>{
   
    // NOTE: this is the correct format but i don't know how to pass in args. will us springboot library to save. 
    // IF INCORRECT AND NOT USED, spring boot will not work. leave it commented unless it works for sure :)

    @Query("SELECT s FROM Account s WHERE s.username =?1")
    Account getAccountByUsername(String username);

    @Query("SELECT s FROM Account s WHERE s.username=?1 and s.crypt_password = ?2")
    Account getAccountByUsernameAndCrypt_password(String username, String password);

    @Query("SELECT s FROM Account s WHERE s.username=?1")
    Account getAccountByOnlyUsername(String username);

    @Query("SELECT s FROM Account s where s.email = ?1 and s.crypt_password = ?2")
    Account getAccountByEmailAndCrypt_password(String email, String password);

    @Query("SELECT s FROM Account s where s.email = ?1")
    Account getAccountByOnlyEmail(String email);

    @Query("SELECT s FROM Account s where s.email = ?1")
    Account getAccountByEmail(String email);

    @Query("SELECT t1.req_following FROM Account t1 where t1.account_id = ?1")
    long getReqDM(long accountId);

    @Modifying
    @Transactional
    @Query("UPDATE Account SET req_following = ?2 WHERE (account_id = ?1 )")
    void setReqDM(long accountId, Long flag);

    // @Query(
    //     value = "INSERT INTO account_info(username, email, crypt_password) VALUES (?1, ?2, ?3);",
    //     nativeQuery = true
    // )        
    // void initialAccountCreation(String username, String email, String crypt_password);
}
