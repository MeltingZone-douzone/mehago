package com.douzone.mehago.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.vo.Message;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MessageRepository {

    private final SqlSession sqlSession;

    public List<Message> getMessageList(Long chatRoomNo, Long offset) {
        Map<String, Long> map = new HashMap<>();
        map.put("chatRoomNo", chatRoomNo);
        map.put("offset", offset);
        return sqlSession.selectList("message.getMessageList", map);
    }

    public List<Long> getSearchMessage(String searchKeyword) {
        return sqlSession.selectList("message.getSearchMessage", searchKeyword);
    }

    public Long getLastReadChatNo(Long roomNo) {
        return sqlSession.selectOne("message.getLastReadChatNo", roomNo);
    }

}
