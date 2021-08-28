package com.douzone.mehago.service;

import com.douzone.mehago.repository.MessageRepository;
import com.douzone.mehago.vo.Message;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public Long updateNotReadCount(Message message) {
        return messageRepository.updateNotReadCount(message);
    }

}
