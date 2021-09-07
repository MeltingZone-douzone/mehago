package com.douzone.mehago.vo;

import java.util.Date;

import lombok.Data;

@Data
public class Todo {
    private Long no;
    private Long participantNo;
    private Long chatRoomNo;
    private String todo;
    private String date;
    private boolean checked;
}