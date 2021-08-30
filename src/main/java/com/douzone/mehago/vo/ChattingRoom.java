package com.douzone.mehago.vo;

import java.sql.Date;
import java.util.ArrayList;

import lombok.Data;

@Data
public class ChattingRoom {
    private Long no;
    private String title;
    private String password;
    private String thumbnailUrl;
    private String limitedUserCount;
    private String createdAt;
    private boolean onlyAuthorized;
    private boolean searchable;
    private boolean secretRoom;
    private Long owner;

    private String[] tagName;
}