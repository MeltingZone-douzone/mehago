package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class PasswordVo {
    private Long no;
    private String prevPassword; // 이전 비밀번호
    private String newPassword;
}
