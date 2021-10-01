package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Message {
    private Long no;
    private Long participantNo;
    private String message;
    private Long notReadCount;
    private String createdAt;
    private Long chatRoomNo;

    private String thumbnailUrl;
    private String nickname;
    private String roomName;

}
