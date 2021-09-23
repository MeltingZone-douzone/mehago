package com.douzone.mehago.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.ChatRoomRepository;
import com.douzone.mehago.vo.ChatRoom;
import com.douzone.mehago.vo.Notice;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public Long createRoom(ChatRoom chatRoom) {
        return chatRoomRepository.createRoom(chatRoom);
    }

    public List<Map<String, Object>> getAllChatList(String offset) {
        return chatRoomRepository.getAllChatList(Long.parseLong(offset));
    }

    public ChatRoom getRoomInfo(Long chatRoomNo) {
        return chatRoomRepository.getRoomInfo(chatRoomNo);
    }

    public List<Map<String, Object>> participatingRoom(Long no) {
        return chatRoomRepository.participatingRoom(no);
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

    public List<ChatRoom> getFavoriteRoomList(Long no) {
        return chatRoomRepository.getFavoriteRoomList(no);
    }

    public boolean checkIsDeleted(Long chatRoomNo) {
        return chatRoomRepository.checkIsDeleted(chatRoomNo);
    }

    public boolean deleteChatRoom(Long chatRoomNo) {
        return chatRoomRepository.deleteChatRoom(chatRoomNo);
    }

    public boolean exitRoom(Long chatRoomNo, Long accountNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("chatRoomNo", chatRoomNo);
        map.put("accountNo", accountNo);
        return chatRoomRepository.exitRoom(map);
    }

}
