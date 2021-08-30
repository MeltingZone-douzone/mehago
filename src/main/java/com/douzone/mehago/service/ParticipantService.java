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

    public Long addMessage(Message message) {
        return participantRepository.addMessage(message);
    }

}
