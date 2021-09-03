package com.douzone.mehago.repository;

import java.util.List;

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

    public List<Message> getMessageList(Long chatRoomNo) {
        return sqlSession.selectList("message.getMessageList", chatRoomNo);
    }

    public boolean updateNotReadCount(Message message) {
        return sqlSession.update("message.subtractNotReadCountOfAddMessage", message) == 1 ? true : false;
    }

    public boolean subtractNotReadCount(Participant participant) {
        return sqlSession.update("message.subtractNotReadCount", participant) == 1 ? true : false;
    }

}
