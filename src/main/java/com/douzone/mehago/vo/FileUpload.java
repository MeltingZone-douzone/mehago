package com.douzone.mehago.vo;

import java.util.ArrayList;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FileUpload {
    private Long no;
    private Long chatRoomNo;
    private Long participantNo;
    private String name;
    private String url;
    private String type;
    private ArrayList<MultipartFile> files;
    private MultipartFile file;
}
