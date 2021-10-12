package com.douzone.mehago.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.ChatRoomRepository;
import com.douzone.mehago.vo.ChatRoom;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ParticipantService participantService;
    private final ChatRoomRepository chatRoomRepository;
    // private final ES_ChatRoomRepository esChatRoomRepository;

    public Long createRoom(ChatRoom chatRoom) {
        return chatRoomRepository.createRoom(chatRoom);
    }

    public List<Map<String, Object>> getAllChatList(String offset) {
        return chatRoomRepository.getAllChatList(Long.valueOf(offset));
    }

    public ChatRoom getRoomInfo(Long chatRoomNo) {
        return chatRoomRepository.getRoomInfo(chatRoomNo);
    }

    public List<Map<String, Object>> participatingRoom(Long AccountNo) {
        return chatRoomRepository.participatingRoom(AccountNo);
    }

    public List<Map<String, Object>> keywordSearch(String searchValue) {
        return chatRoomRepository.keywordSearch(searchValue);
    }

    public List<String> getTagName(Long no) {
        return chatRoomRepository.getTagname(no);
    }

    public boolean changePassword(ChatRoom chatRoom) {
        return chatRoomRepository.changePassword(chatRoom);
    }

    public boolean updateChatRoomInfo(ChatRoom chatRoom) {
        return chatRoomRepository.updateChatRoomInfo(chatRoom);
    }

    public boolean isExistsPassword(Long no) {
        return chatRoomRepository.isExistsPassword(no);
    }

    public boolean checkPassword(Long no, String password) {
        return chatRoomRepository.checkPassword(no, password);
    }

    public List<ChatRoom> getFavoriteRoomList(Long accountNo, Long nonMemberNo) {
        return chatRoomRepository.getFavoriteRoomList(accountNo, nonMemberNo);
    }

    public boolean checkIsDeleted(Long chatRoomNo) {
        return chatRoomRepository.checkIsDeleted(chatRoomNo);
    }

    public boolean deleteChatRoom(Long chatRoomNo) {
        boolean result = participantService.chatRoomDeleted(chatRoomNo);
        return result ? chatRoomRepository.deleteChatRoom(chatRoomNo) : false;
    }

    public boolean exitRoomNonmember(Long chatRoomNo, Long participantNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("chatRoomNo", chatRoomNo);
        map.put("participantNo", participantNo);
        return chatRoomRepository.exitRoomNonmember(map);
    }

    public boolean exitRoomMember(Long chatRoomNo, Long participantNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("chatRoomNo", chatRoomNo);
        map.put("participantNo", participantNo);
        return chatRoomRepository.exitRoomMember(map);
    }

    public List<Map<String, Object>> getRoomInfoNonMember(Long nonMemberNo) {
        return chatRoomRepository.getRoomInfoNonMember(nonMemberNo);
    }

}
