package com.douzone.mehago.service;

import java.util.List;
import java.util.Map;

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

    public List<ChattingRoom> getChatRoomList() {
        return chattingRoomRepository.getChatRoomList();
    }
    public ChattingRoom getRoomInfo(Long chattingRoomNo) {
        return chattingRoomRepository.getRoomInfo(chattingRoomNo);
    }

    public List<ChattingRoom> participatingRoom(Long no) {
        return chattingRoomRepository.participatingRoom(no);
    }

}
