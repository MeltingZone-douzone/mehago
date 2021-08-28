package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class Message {
    private Long no;
    private Long participantNo;
    private String message;
    private Long notReadCount;
    private Long createdAt;
    private Long chattingRoomNo;

//  socket에 뿌릴 객체에 필요한 컬럼임. DB X    
    private String nickname;
    private String roomName;
}
