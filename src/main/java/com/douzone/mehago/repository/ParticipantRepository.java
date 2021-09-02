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

    public Participant getParticipantInfo(Map<String, Long> map) {
        Participant result = sqlSession.selectOne("participant.getParticipantInfo", map);
        return result;
    }

    public boolean updateLastReadNo(Participant participant) {
        return sqlSession.update("participant.updateLastReadNo", participant) == 1 ? true : false;
    }

    public boolean updateNotReadCount(Participant participant) {
        return sqlSession.update("participant.updateNotReadCount", participant) == 1 ? true : false;
    }

    public boolean updateLastReadNoForJoin(Participant participant) {
        System.out.println(participant.getChattingRoomNo());
        return sqlSession.update("participant.updateLastReadNoForJoin", participant) == 1 ? true : false;
    }

    public boolean addNotReadCount(Message message) {
        return sqlSession.update("participant.addNotReadCount", message) == 1 ? true : false;
    }

    public Long getChatMember(Long chattingRoomNo) {
        return sqlSession.selectOne("participant.getChatMember", chattingRoomNo);
    }

}
