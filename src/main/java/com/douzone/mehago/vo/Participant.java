package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Participant {
    private Long no;
    private String chatNickname;
    private int notReadCount;
    private Long lastReadChatNo;

    private Long accountNo;
    private Long chatRoomNo;
    private Boolean favoriteRoom;
}
