package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Alarm {
    
    private Long no;
    private Long accountNo;
    private Long chatRoomNo;
    private String reason;
    private boolean read;
    private String createdAt;

    
}
