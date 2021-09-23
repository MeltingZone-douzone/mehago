package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class FileUpload {
    private Long no;
    private Long chatRoomNo;
    private Long participantNo;
    private String url;
    private String createdAt;
}
