package com.douzone.mehago.repository;

import java.util.HashMap;
import java.util.Map;

import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.PasswordVo;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AccountRepository {
 
    
    private final SqlSession sqlSession;

    public Boolean signUp(Account account) {
		return sqlSession.insert("account.insert", account) == 1 ? true : false;
	}

    public Account getAccount(Account account) {
        return sqlSession.selectOne("account.findByEmailAndPassword",account);
    }

    public Account getAccountByToken(Account account) {
        return sqlSession.selectOne("account.findByNo",account);
    }

    public Account searchAccount(String name, String email){
        Map<String, String> map = new HashMap<>();
            map.put("name", name);
            map.put("email", email);
        return sqlSession.selectOne("account.searchAccount", map);
    }

    public Account searchEmail(String name, String phoneNumber){
        Map<String, String> map = new HashMap<>();
            map.put("name", name);
            map.put("phoneNumber", phoneNumber);

        return sqlSession.selectOne("account.searchEmail",map);
    }

    public boolean updateNickname(Account account) {
        return sqlSession.update("account.updateNickname", account) == 1 ? true : false;
    }

    public boolean updatePassword(PasswordVo vo) {
        return sqlSession.update("account.updatePassword", vo) == 1 ? true : false;
    }

    public boolean updateUserInfo(Account account) {
        return sqlSession.update("account.updateUserInfo", account) == 1 ? true : false;
    }

    public boolean updateToken(Account account) {
        return sqlSession.update("account.updateToken", account) == 1 ? true : false;
    }

    public void updateRandomPassword(String randomPassword, String email){
        Map<String, String> map = new HashMap<>();
            map.put("randomPassword", randomPassword);
            map.put("email", email);

        sqlSession.update("account.updateRendomPassword", map);
    }

    public String isExistsData(String name, String value) {
        Map<String, Object> map = new HashMap<>();
		map.put("name", name);
		map.put("value", value);
        System.out.println(map);
        return sqlSession.selectOne("account.isExistsData", map);
    }
}
