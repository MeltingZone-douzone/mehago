package com.douzone.mehago.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.vo.ChatRoom;
import com.douzone.mehago.vo.Notice;

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

    public List<Map<String, Object>> getAllChatList(Long offset) {
        return sqlSession.selectList("chatroom.getAllChatList", offset);
    }

    public ChatRoom getRoomInfo(Long chatRoomNo) {
        return sqlSession.selectOne("chatroom.getRoomInfo", chatRoomNo);
    }

    public List<Map<String, Object>> participatingRoom(Long no) {
        return sqlSession.selectList("chatroom.participatingRoom", no);
    }

    public List<Map<String, Object>> keywordSearch(String searchValue) {
        return sqlSession.selectList("chatroom.keywordSearch", searchValue);
    }

    public List<String> getTagname(Long no) {
        return sqlSession.selectList("chatroom.getTagName", no);
    }

    public boolean changePassword(ChatRoom chatRoom) {
        return sqlSession.update("chatroom.changePassword", chatRoom) == 1 ? true : false;
    }

    public boolean updateChatRoomInfo(ChatRoom chatRoom) {
        return sqlSession.update("chatroom.updateChatRoomInfo", chatRoom) == 1 ? true : false;
    }

    public boolean isExistsPassword(Long no) {
        String result = sqlSession.selectOne("chatroom.isExistsPassword", no);
        return !"".equals(result) ? true : false;
    }

    public boolean checkPassword(Long no, String password) {
        Map<String, String> map = new HashMap<>();
        map.put("no", no.toString());
        map.put("password", password);
        String result = sqlSession.selectOne("chatroom.checkPassword", map);
        return result != null ? true : false;
    }

    public List<ChatRoom> getFavoriteRoomList(Long no) {
        Map<String, Long> map = new HashMap();
        map.put("accountNo", no);
        return sqlSession.selectList("chatroom.getFavoriteRoomList", map);
    }

    
    public boolean checkIsDeleted(Long chatRoomNo) {
        return sqlSession.selectOne("chatroom.checkIsDeleted", chatRoomNo);
    }

    public boolean deleteChatRoom(Long chatRoomNo) {
        return sqlSession.update("chatroom.deleteChatRoom", chatRoomNo) == 1 ? true : false;
    }

    public boolean exitRoom(Map<String, Long> map) {
        return sqlSession.delete("chatroom.exitRoom", map) == 1 ? true : false;
    }
}
