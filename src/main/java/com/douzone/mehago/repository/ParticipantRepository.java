package com.douzone.mehago.repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.vo.ChatRoom;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.NonMember;
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
        System.out.println(participant.getChatRoomNo());
        return sqlSession.update("participant.updateLastReadNoForJoin", participant) == 1 ? true : false;
    }

    public boolean addNotReadCount(Message message) {
        return sqlSession.update("participant.addNotReadCount", message) == 1 ? true : false;
    }

    public List<Participant> getParticipantsList(Long chatRoomNo) {
        return sqlSession.selectList("participant.getParticipantsList", chatRoomNo);
    }

    public boolean nicknameValidation(Participant participant) {
        String result = sqlSession.selectOne("participant.nicknameValidation", participant);
        return result != null ? true : false;
    }

    public Long getLastReadChatNo(Long chatRoomNo) {
        return sqlSession.selectOne("participant.getLastReadChatNo", chatRoomNo);
    }

    public Boolean joinFavoriteRoom(Long no, Long accountNo, Long nonMemberNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("chatRoomNo", no);
        map.put("accountNo", accountNo);
        map.put("nonMemberNo", nonMemberNo);
        map.put("favoriteRoom", 1L);
        return sqlSession.update("participant.joinFavoriteRoom", map) == 1 ? true : false;

    }

    public boolean setExpirationDate(NonMember nonMember, Date expirationDate) {
        Map<String, Object> map = new HashMap<>();
        map.put("no", nonMember.getParticipantNo());
        map.put("expirationDate", expirationDate);
        return sqlSession.update("participant.updateExpirationDate", map) == 1 ? true : false;
    }

    public boolean updateIsDeleted(Long participantNo) {
        return sqlSession.update("participant.updateIsDeleted", participantNo) == 1 ? true : false;
    }

    public Participant getnonMemberInfo(Long nonMemberNo, Long chatRoomNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("no", nonMemberNo);
        map.put("chatRoomNo", chatRoomNo);
        return sqlSession.selectOne("participant.getNonMemberInfo", map);
    }

}
