package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Todo {
    private Long no;
    private Long participantNo;
    private Long chatRoomNo;
    private String todo;
    private Boolean checked;
    private String createdAt;

    private String chatNickname; // ToDo리스트 뽑을때 매핑하려고
}