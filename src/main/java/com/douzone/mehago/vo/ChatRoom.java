package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class ChatRoom {
    private Long no;
    private String title;
    private String password;
    private String thumbnailUrl;
    private String limitedUserCount;
    private String createdAt;
    private boolean onlyAuthorized;
    private boolean searchable;
    private Long owner;

    private String[] tagName;
}