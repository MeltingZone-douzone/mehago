package com.douzone.mehago.service;

import com.douzone.mehago.repository.AccountRepository;
import com.douzone.mehago.utils.AES;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.PasswordVo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

    @Value("${spring.jwt.secret}")
    private String SECRET_KEY;
    
    private final AccountRepository accountRepository;

    public void signUp(Account account) {
        account = getEncryptPassword(account);
        accountRepository.signUp(account);
    }

    public Account getAccount(String email, String password){
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(password);
        account = getEncryptPassword(account);
        return getAccount(account);
    }

    public Account getAccount(Account account){
        account = getEncryptPassword(account);
        return accountRepository.getAccount(account);
    }

    public Account getAccountByToken(Account account){
        // no, nickname
        return accountRepository.getAccountByToken(account);
    }

    public Account searchEmail(String name, String phoneNumber){
        // 이름, 번호
        return accountRepository.searchEmail(name, phoneNumber);
    }

    public Account searchAccount(String name, String email){
        // 이름, 이메일
        return accountRepository.searchAccount(name, email);
    }

    public boolean updateNickname(Account account) {
        return accountRepository.updateNickname(account);
    }
    
    public boolean updatePassword( PasswordVo passwordVo) {
        passwordVo.setPrevPassword(getEncryptPassword(passwordVo.getPrevPassword()));
        passwordVo.setNewPassword(getEncryptPassword(passwordVo.getNewPassword()));

        return accountRepository.updatePassword(passwordVo); 
        
    }

    public boolean updateUserInfo(Account account) {
        return accountRepository.updateUserInfo(account);
    }

    public void updatePassword(String randomPassword, String email){
        accountRepository.updateRandomPassword(randomPassword, email);
    }

    public boolean updateToken(Account account) {
        return accountRepository.updateToken(account);
    }

    public String isExistsData(String name, String value) {
        return accountRepository.isExistsData("phoneNumber".equals(name) ? "phone_number" : name, value);
    }

    private Account getEncryptPassword (Account account) {
        account.setPassword(AES.encrypt(account.getPassword(), SECRET_KEY)); // 비밀번호 암호화
        return account;
    }

    private String getEncryptPassword ( String password ) {
        return AES.encrypt(password, SECRET_KEY);
    }

    public void changeRandomPassword(Account account) {
        account = getEncryptPassword(account);
        System.out.println(account);
        accountRepository.changeRandomPassword(account);
    }

    public boolean updateThumbnailUrl(Account account) {
        return accountRepository.updateThumbnailUrl(account);
        
    }

    public void leaveMember(Long accountNo) {
        accountRepository.leaveMember(accountNo);
    }
}
