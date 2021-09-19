package com.douzone.mehago.security;

import javax.servlet.http.HttpServletRequest;

import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.NonMember;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class AuthUserHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {

   @Override
   public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
         NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

      if (supportsParameter(parameter) == false) {
         return WebArgumentResolver.UNRESOLVED;
      }

      HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
      Account account = (Account) request.getAttribute("account");
      NonMember nonMember = (NonMember) request.getAttribute("nonMember");

      if (account == null) {
         if (nonMember == null) {
            return null;
         }
         return nonMember;
      }

      return account; // return해주는 타입이 argument로 박힘 authUser
   }

   // 지원해주는 타입인가 판단함. ex) 어노테이션이 붙어있는 파라미터인지, type이 UserVO인가
   @Override
   public boolean supportsParameter(MethodParameter parameter) {
      AuthUser authUser = parameter.getParameterAnnotation(AuthUser.class);
      if (authUser == null) { // @authUser가 선언되어있지 않으면,
         return false;
      }

      // @authUser가 선언되어있는데 타입이 UserVO가 아니면
      if (parameter.getParameterType().equals(Account.class) == false
            && parameter.getParameterType().equals(NonMember.class) == false) {
         return false;
      }

      return true;
   }

}