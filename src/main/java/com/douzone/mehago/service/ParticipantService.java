package com.douzone.mehago.service;

import java.util.Map;

import com.douzone.mehago.repository.ParticipantRepository;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Participant;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public Long createParticipant(Participant participant) {
        return participantRepository.createParticipant(participant);
    }

    public Participant getParticipantInfo(Map<String, Long> map) {
        return participantRepository.getParticipantInfo(map);
    }

    public boolean updateLastReadNo(Participant participant) {
        participantRepository.updateNotReadCount(participant);
        return participantRepository.updateLastReadNo(participant);
    }

    public boolean addNotReadCount(Message message) {
        return participantRepository.addNotReadCount(message);
    }

    public boolean updateReadCountOfJoin(Participant participant) {
        boolean result = false;
        // not_read_chat을 0으로 바꿔준다.
        // last_read_chat_no 를 채팅방 마지막 번호로 준다.
        result = participantRepository.updateLastReadNoForJoin(participant);
        result = participantRepository.updateNotReadCount(participant);
        return result;
    }

    public Long getChatMember(Long chattingRoomNo) {
        return participantRepository.getChatMember(chattingRoomNo);
    }
}
