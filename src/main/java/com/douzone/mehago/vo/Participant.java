package com.douzone.mehago.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Participant extends TokenInfo {
    private Long no;
    private String chatNickname;
    private int notReadCount;
    private Long lastReadChatNo;

    private Long accountNo;
    private Long chatRoomNo;
    private Boolean favoriteRoom;
    private Boolean isDeleted;

    public Participant() {
    }

    public Participant(TokenInfo tokenInfo) {
        this.no = tokenInfo.getNo();
        this.chatNickname = tokenInfo.getNickname();
    }
}
