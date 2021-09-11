package com.douzone.mehago.service;

import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.ChatRoomRepository;
import com.douzone.mehago.vo.ChatRoom;
import com.douzone.mehago.vo.Participant;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    public Long createRoom(ChatRoom chatRoom) {
        return chatRoomRepository.createRoom(chatRoom);
    }

    public List<Map<String, Object>> getAllChatList() {
        return chatRoomRepository.getAllChatList();
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

    public boolean isExistsPassword(Long no) {
        return chatRoomRepository.isExistsPassword(no);
    }

    public boolean checkPassword(Long no, String password) {
        return chatRoomRepository.checkPassword(no,password);
    }

    public List<ChatRoom> favoriteRoomList(Long no) {
        return chatRoomRepository.favoriteRoomList(no);
    }


   

}
