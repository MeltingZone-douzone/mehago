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
    private Boolean isDeleted;
    // private String favoriteRoom; // 잠시 string으로 고침

    private Boolean hasData;
}
