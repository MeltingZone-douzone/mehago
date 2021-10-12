package com.douzone.mehago.service;

import java.util.ArrayList;
import java.util.List;

import com.douzone.mehago.entities.MessageEntity;
import com.douzone.mehago.repository.ES_MesaageRepository;
import com.douzone.mehago.repository.MessageRepository;
import com.douzone.mehago.vo.Message;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final ES_MesaageRepository es_MesaageRepository;
    private final MessageRepository messageRepository;

    public List<Message> getMessageList(Long chatRoomNo, Long offset, Long participantNo) {
        return messageRepository.getMessageList(chatRoomNo, offset, participantNo);
    }

    public List<Long> getSearchMessage(Long chatRoomNo, String searchKeyword) {
        List<MessageEntity> list = es_MesaageRepository.findByChatRoomNoAndMessageContaining(chatRoomNo, searchKeyword);
        List<Long> result = new ArrayList<>();
        for (MessageEntity message : list) {
            result.add(message.getNo());
        }

        return result;

    }
}
