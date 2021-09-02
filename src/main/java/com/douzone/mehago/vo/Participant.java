package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Participant {
    private Long no;
    private String chatNickname;
    private int notReadChat;
    private Long lastReadChatNo;

    private Long accountNo;
    private Long chattingRoomNo;
}
