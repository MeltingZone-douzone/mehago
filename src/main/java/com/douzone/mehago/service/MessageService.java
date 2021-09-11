package com.douzone.mehago.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.MessageRepository;
import com.douzone.mehago.vo.Message;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<Message> getMessageList(Long chatRoomNo, Long offset) {
        return messageRepository.getMessageList(chatRoomNo, offset);
    }

    public List<Long> getSearchMessage(Long chatRoomNo, String searchKeyword) {
        Map<String, Object> map = new HashMap();
        map.put("chatRoomNo", chatRoomNo);
        map.put("searchKeyword", searchKeyword);
        return messageRepository.getSearchMessage(map);
    }
}
