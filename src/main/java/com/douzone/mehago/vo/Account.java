package com.douzone.mehago.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Account extends TokenInfo {

    private Long no;
    private String email;
    private String password;
    private String nickname;
    private String name;
    private String phoneNumber;
    private String thumbnailUrl;
    private String token;
    private Boolean isDeleted;

    public Account() {
    }

    public Account(TokenInfo tokenInfo) {
        this.no = tokenInfo.getNo();
        this.nickname = tokenInfo.getNickname();
    }
}
