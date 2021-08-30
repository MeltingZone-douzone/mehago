package com.douzone.mehago.security;

import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.douzone.mehago.exceptions.LoginException;
import com.douzone.mehago.responses.CommonResponse;
import com.douzone.mehago.service.AccountService;
import com.douzone.mehago.utils.JsonBodyConverter;
import com.douzone.mehago.utils.JwtTokenUtil;
import com.douzone.mehago.vo.Account;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;


public class LoginInterceptor implements HandlerInterceptor{
	
	@Autowired private AccountService accountService;
	@Autowired private JwtTokenUtil jwtTokenUtil;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {


		String body = JsonBodyConverter.getBody(request);

		Account account = new Account();
		account.setEmail(body.split("\"")[3]);
		account.setPassword(body.split("\"")[7]);
		Account result = accountService.getAccount(account); 
		response.setContentType("application/json");
 		response.setCharacterEncoding("UTF-8");
		 
		if(result == null){
			response.getWriter().write("cant find Account");
			return false;
		}

		String token = jwtTokenUtil.generateAccessToken(result);
		System.out.println(token);
		account.setToken(token);
		accountService.updateToken(account);
 		response.getWriter().write(token);
		return false;
	}
}