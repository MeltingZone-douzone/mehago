package com.douzone.mehago.service;

import com.douzone.mehago.repository.ParticipantRepository;
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

}
