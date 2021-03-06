package com.douzone.mehago.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.AccountRepository;
import com.douzone.mehago.repository.MessageRepository;
import com.douzone.mehago.repository.ParticipantRepository;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.NonMember;
import com.douzone.mehago.vo.Participant;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final MessageRepository messageRepository;
    private final AccountRepository accountRepository;

    public Long createParticipant(Participant participant) {
        return participantRepository.createParticipant(participant);
    }

    public Participant getInfoForMessageList(Account auth, Long chatRoomNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("accountNo", auth.getNo());
        map.put("chatRoomNo", chatRoomNo);
        return participantRepository.getParticipantInfo(map);

    }

    public Participant getParticipantInfo(Account auth, Long chatRoomNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("accountNo", auth.getNo());
        map.put("chatRoomNo", chatRoomNo);
        Participant participant = participantRepository.getParticipantInfo(map);

        if (participant == null) {
            // 회원유저가 처음 들어왔다면
            participant = new Participant();
            participant.setAccountNo(auth.getNo());
            participant.setChatNickname(auth.getNickname());
            participant.setChatRoomNo(chatRoomNo);
            participant.setLastReadChatNo(messageRepository.getLastReadChatNo(chatRoomNo));
            participant.setFavoriteRoom(false);
            participant.setNo(createParticipant(participant));
            participant.setThumbnailUrl(accountRepository.getAccountByToken(auth).getThumbnailUrl());
            participant.setHasData(false);
        } else {
            participant.setHasData(true);
        }

        return participant;
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

    public List<Participant> getParticipantsList(Long chatRoomNo) {
        return participantRepository.getParticipantsList(chatRoomNo);
    }

    public boolean nicknameValidation(Participant participant) {
        return participantRepository.nicknameValidation(participant);
    }

    public Long addNonMember(Participant participant) {
        participant.setAccountNo(null);
        participant.setFavoriteRoom(false);
        return participantRepository.createParticipant(participant);
    }

    public Long getLastReadChatNo(Long chatRoomNo) {
        return participantRepository.getLastReadChatNo(chatRoomNo);
    }

    public boolean setExpirationDate(NonMember nonMember, Date expirationDate) {
        return participantRepository.setExpirationDate(nonMember, expirationDate);
    }

    public boolean updateIsDeleted(Long participantNo) {
        return participantRepository.updateIsDeleted(participantNo);
    }

    public boolean chatRoomDeleted(Long ChatRoomNo) {
        return participantRepository.chatRoomDeleted(ChatRoomNo);
    }

    public Participant getnonMemberInfo(Long nonMemberNo, Long chatRoomNo) {
        return participantRepository.getnonMemberInfo(nonMemberNo, chatRoomNo);
    }

    public Boolean updateFavoriteRoom(Long chatRoomNo, Long accountNo, Long nonMemberNo, Boolean favoriteRoom) {
        return participantRepository.updateFavoriteRoom(chatRoomNo, accountNo, nonMemberNo, favoriteRoom);
    }

    public Boolean isExistsParticipants(Long chatRoomNo, Long accountNo, Long nonMemberNo) {
        return participantRepository.isExistsParticipants(chatRoomNo, accountNo, nonMemberNo);
    }
}
