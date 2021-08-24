package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Account {

    private Long no;
    private String email;
    private String password;
    private String nickname;
    private String name;
    private String phoneNumber;
    private String thumbnailUrl;
    private String token;

}
