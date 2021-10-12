// package com.douzone.mehago.entities;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.elasticsearch.annotations.Document;
// import org.springframework.data.elasticsearch.annotations.Field;
// import org.springframework.data.elasticsearch.annotations.FieldType;

// import lombok.Data;

// @Data
// @Document(indexName = "chatroom")
// public class ChatRoomEntity {
    
//     @Id
//     private long no;

//     @Field(type = FieldType.Text, name = "title")
//     private String title;

//     @Field(type = FieldType.Text, name = "thumbnail_url")
//     private String thumbnailUrl;

//     @Field(type = FieldType.Text, name = "limited_user_count")
//     private String limitedUserCount;

//     @Field(type = FieldType.Text, name = "created_at")
//     private String createdAt;

//     @Field(type = FieldType.Integer, name = "only_authorized")
//     private int onlyAuthorized;

//     @Field(type = FieldType.Integer, name = "searchable")
//     private int searchable;

//     @Field(type = FieldType.Integer, name = "owner")
//     private Long owner;
// }
