package com.douzone.mehago.service;

import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.ChatRoomRepository;
import com.douzone.mehago.vo.ChatRoom;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public Long createRoom(ChatRoom chatRoom) {
        return chatRoomRepository.createRoom(chatRoom);
    }

    public List<ChatRoom> getChatRoomList() {
        return chatRoomRepository.getChatRoomList();
    }

    public ChatRoom getRoomInfo(Long chatRoomNo) {
        return chatRoomRepository.getRoomInfo(chatRoomNo);
    }

    public List<ChatRoom> participatingRoom(Long no) {
        return chatRoomRepository.participatingRoom(no);
    }

    public List<ChatRoom> keywordSearch(String searchValue) {
        return chatRoomRepository.keywordSearch(searchValue);
    }

    public List<String> getTagName(Long no) {
        return chatRoomRepository.getTagname(no);
    }

    public boolean vaildatePassword(ChatRoom chatRoom) {
        return chatRoomRepository.vaildatePassword(chatRoom);
    }

    public boolean changePassword(ChatRoom chatRoom) {
        return chatRoomRepository.changePassword(chatRoom);
    }

    public boolean updateChatRoomInfo(ChatRoom chatRoom) {
        return chatRoomRepository.updateChatRoomInfo(chatRoom);
    }

}
