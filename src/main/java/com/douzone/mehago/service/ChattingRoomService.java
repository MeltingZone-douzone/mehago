package com.douzone.mehago.service;

import com.douzone.mehago.repository.ChattingRoomRepository;
import com.douzone.mehago.vo.ChattingRoom;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChattingRoomService {

    private final ChattingRoomRepository chattingRoomRepository;

    public Long createRoom(ChattingRoom chattingRoom) {
        return chattingRoomRepository.createRoom(chattingRoom);
    }

}
