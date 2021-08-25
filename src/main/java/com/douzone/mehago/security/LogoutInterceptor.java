package com.douzone.mehago.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.douzone.mehago.service.AccountService;
import com.douzone.mehago.utils.JwtDecoder;
import com.douzone.mehago.vo.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;


public class LogoutInterceptor implements HandlerInterceptor {
	
	@Autowired private AccountService accountService;
	@Autowired private JwtDecoder jwtDecoder;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
	
		if (request.getHeader("Authorization") == null) {
			response.getWriter().write("cant find Account");
			return false;
		}

		// token이 존재
		String token = request.getHeader("Authorization");
		Account decodeAccount = jwtDecoder.decodeJwt(token.split("Bearer ")[1]);
		decodeAccount.setToken("");
		System.out.println(decodeAccount.toString());
		accountService.updateToken(decodeAccount);

		System.out.println("로그아웃 성공 in LogoutInterceptor");
		response.getWriter().write("success");


		System.out.println("logout successfully in LogoutInterceptor");
		return false;
	}

}