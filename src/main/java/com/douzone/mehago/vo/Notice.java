package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Notice {
    private Long no;
    private Long chatRoomNo;
    private Long participantNo;
    private Long accountNo;
    private String notice;
    private String createdAt;

}
