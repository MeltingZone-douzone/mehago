package com.douzone.mehago.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.douzone.mehago.utils.JwtDecoder;
import com.douzone.mehago.vo.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;


public class AuthInterceptor implements HandlerInterceptor {
//		조건을 따져보고 해당 핸들러를 실행시켜

	@Autowired private JwtDecoder jwtDecoder;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
				throws Exception {
			
			// 1. handler 종류 확인
//			HandlerMethod 는 후에 실행할 컨트롤러의 메소드
//			메소드명, 인스턴스, 타입, 사용된 Annotation 들을 확인할 수 있다
			if(handler instanceof HandlerMethod == false) { 
//				DefaultServletHandler가 처리하는 경우 (정적 자원 접근)
				return true;	// Controller에 있는 메서드가 아니므로 그대로 컨트롤러로 진행
			}
			
//			 2. casting
			HandlerMethod handlerMethod = (HandlerMethod)handler;
			
//			 3. Handler Method의 @Auth 받아오기
			Auth auth = handlerMethod.getMethodAnnotation(Auth.class);
			
//			 4. Handler Method에 @Auth가 없으면 Type에 붙어있는지 확인한다 
			if(auth == null) { 
//				클래스의 어노테이션을 체크
//				class type에도 @Auth가 있는지 찾아봐야함 (ex)guestbook @Auth 클래스에 선언되어있는거) 그리고 role="ADMIN" 
				auth = handlerMethod.getMethod().getDeclaringClass().getAnnotation(Auth.class);
//				return true;
			}
//			5. Type이나 Method 둘 다 @Auth가 적용이 안되어 있는 경우
			if(auth == null) {
				return true;
			}
			
//			 6. @Auth가 붙어있기 때문에 인증(Authenfication) 여부 확인

			if(request.getHeader("Authorization") == null) {
				response.getWriter().write("cant find Account");
				return false;
			}
			
			
//			token이 존재
			String token = request.getHeader("Authorization");
			Account decodedAccount = jwtDecoder.decodeJwt(token.split("Bearer ")[1]);
			request.setAttribute("account", decodedAccount);


			///////////////지금은 무시무시무시무시무시////////////////////////////////////////////////////
			
//			7. 권한(Authorization) 체크를 위해서 @Auth의 role 가져오기 ("ADMIN", "USER")
			
			// String role = auth.user().toString();

			// TODO role 대신 회원/비회원 구분할 거 찾기

			// String authRole = authUser.getRole();
			// System.out.println(role + " " + authRole);
			
			/*
			if("ADMIN".equals(role)) {
				if(!"ADMIN".equals(authRole)) {
				if("USER".equals(authRole)) {
					response.sendRedirect(request.getContextPath());
					request.getRequestDispatcher("/WEB-INF/views/admin/main.jsp").forward(request, response);
					return false;
				}
			}
					
			 */
			
		return true;
	}
}