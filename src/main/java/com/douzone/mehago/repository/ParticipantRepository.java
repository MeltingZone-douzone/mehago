package com.douzone.mehago.repository;

import java.util.Map;

import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Participant;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ParticipantRepository {

    private final SqlSession sqlSession;

    public Long createParticipant(Participant participant) {
        sqlSession.insert("participant.createParticipant", participant);
        return participant.getNo();
    }

    public Long getParticipantNo(Map<String, Long> map) {
        return sqlSession.selectOne("participant.getParticipantNo", map);
    }

    public Long addMessage(Message message) {
        sqlSession.insert("message.addMessage", message);
        return message.getNo();
    }

}
