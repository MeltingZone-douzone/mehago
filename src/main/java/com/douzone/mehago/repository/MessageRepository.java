package com.douzone.mehago.repository;

import java.util.List;

import com.douzone.mehago.vo.Message;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MessageRepository {
    
    private final SqlSession sqlSession;

    public List<Message> getMessageList(Long chattingRoomNo) {
        return sqlSession.selectList("message.getMessageList", chattingRoomNo);
    }
    public Long updateNotReadCount(Message message) {
        sqlSession.update("message.addMessageUpdate", message);
        return message.getNotReadCount();
    }

}
