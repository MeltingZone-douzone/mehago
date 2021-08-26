package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class ChattingRoom {
    private Long no;
    private String title;
    private String password;
    private String thumbnailUrl;
    private String LimitedUserCount;
    // private Date CreatedAt;
    private boolean onlyAuthorized;
    private boolean searchable;
    private boolean secretRoom;
    private Long oner;

    private String[] tagName;
}