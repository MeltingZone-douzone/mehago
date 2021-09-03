package com.douzone.mehago.repository;

import java.util.List;

import com.douzone.mehago.vo.ChatRoom;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepository {

    private final SqlSession sqlSession;

    public Long createRoom(ChatRoom chatRoom) {
        sqlSession.insert("chatroom.createRoom", chatRoom);
        return chatRoom.getNo();
    }
    
    public List<ChatRoom> getChatRoomList() {
        // 추후에 offset 줘서 리스트 뽑아야댐
        return sqlSession.selectList("chatroom.getChatRoomList");
    }

    public ChatRoom getRoomInfo(Long chatRoomNo) {
        return sqlSession.selectOne("chatroom.getRoomInfo", chatRoomNo);
    }

    public List<ChatRoom> participatingRoom(Long no) {
        return sqlSession.selectList("chatroom.participatingRoom", no);
    }
}
