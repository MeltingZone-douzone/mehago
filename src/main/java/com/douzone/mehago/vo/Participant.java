package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Participant {
    private Long no;
    private String chatNickname;
    private Long notReadCount;
    private Long lastReadChatNo;

    private Long accountNo;
    private Long chattingRoomNo;
}
