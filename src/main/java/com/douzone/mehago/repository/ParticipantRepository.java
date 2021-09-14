package com.douzone.mehago.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.vo.ChatRoom;
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

    public void addNonMember(Participant participant) {
        sqlSession.insert("participant.addNonMember", participant);
    }

    public Long getLastReadChatNo(Long chatRoomNo) {
        return sqlSession.selectOne("participant.getLastReadChatNo", chatRoomNo);
    }

    public List<ChatRoom> updateFavoriteRoom(Long chatRoomNo, Long accountNo, String favoriteRoom) {
        Map<String, Object> map = new HashMap();
        map.put("chatRoomNo", chatRoomNo);
        map.put("accountNo", accountNo);
        // map.put("favoriteRoom", 1L); 일단 주석~~~~~~~ㄱㄷ~~~~~~
        map.put("favoriteRoom", favoriteRoom);
        sqlSession.update("participant.updateFavoriteRoom", map);
        return sqlSession.selectList("chatroom.getFavoriteRoomList", map); // 지금 list안씀 나중에 처리함 ㄱㄷ
    }

}
