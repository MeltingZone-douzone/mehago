package com.douzone.mehago.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Participant;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MessageRepository {

    private final SqlSession sqlSession;

    public Long addMessage(Message message) {
        sqlSession.insert("message.addMessage", message);
        return message.getNo();
    }
    
    public List<Message> getMessageList(Long chattingRoomNo, Long offset) {
        Map<String, Long> map = new HashMap();
        map.put("chattingRoomNo", chattingRoomNo);
        map.put("offset", offset);
        return sqlSession.selectList("message.getMessageList", map);
    }

    public boolean updateNotReadCount(Message message) {
        return sqlSession.update("message.subtractNotReadCountOfAddMessage", message) == 1 ? true : false;
    }

    public boolean subtractNotReadCount(Participant participant) {
        return sqlSession.update("message.subtractNotReadCount", participant) == 1 ? true : false;
    }

}
