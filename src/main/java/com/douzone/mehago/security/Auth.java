package com.douzone.mehago.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.TYPE}) // METHOD, TYPE(class)에 붙일 수 있음
@Retention(RetentionPolicy.RUNTIME) // 컴파일이된 클래스파일에도 @Auth가 붙음 CLASS면 떼어짐
// @Retention 어노테이션으로 어느 시점까지 어노테이션의 메모리를 가져갈 지 설정. default는 class임
// RetentionPolicy는 RetentionPolicy의 값을 넘겨주는 것으로 어노테이션의 메모리 보유 범위가 결정됨
public @interface Auth {
//	public String value() default "USER";	// requestParam 의 기본값은 value로 되어있음 value=""
	// public enum Role { ADMIN, USER }
	// public Role role() default Role.USER;

	public String user() default "USER";
}