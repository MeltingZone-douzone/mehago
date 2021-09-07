package com.douzone.mehago.service;

import java.util.List;

import com.douzone.mehago.repository.MessageRepository;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Participant;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<Message> getMessageList(Long chatRoomNo, Long offset) {
        return messageRepository.getMessageList(chatRoomNo, offset);
    }

    public List<Long> getSearchMessage(String searchKeyword) {
        return messageRepository.getSearchMessage(searchKeyword);
    }
}
