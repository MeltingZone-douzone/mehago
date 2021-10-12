// package com.douzone.mehago.entities;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.elasticsearch.annotations.Document;
// import org.springframework.data.elasticsearch.annotations.Field;
// import org.springframework.data.elasticsearch.annotations.FieldType;
// import org.springframework.data.elasticsearch.annotations.Setting;

// import lombok.Data;

// @Data
// @Document(indexName = "message")
// public class MessageEntity {

//     @Id
//     private long no;

//     @Field(type = FieldType.Integer, name = "participant_no")
//     private Long participantNo;
//     @Field(type = FieldType.Text, name = "message")
//     private String message;
//     @Field(type = FieldType.Integer, name = "not_read_count")
//     private Long notReadCount;

//     @Field(type = FieldType.Date, name = "created_at")
//     private String createdAt;

//     @Field(type = FieldType.Integer, name = "chat_room_no")
//     private Long chatRoomNo;

//     @Field(type = FieldType.Integer, name = "state")
//     private Long state;
    
// }
