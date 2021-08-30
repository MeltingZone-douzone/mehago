package com.douzone.mehago.repository;

import com.douzone.mehago.vo.ChattingRoom;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ChattingRoomRepository {

    private final SqlSession sqlSession;

    public Long createRoom(ChattingRoom chattingRoom) {
        sqlSession.insert("chattingroom.createRoom", chattingRoom);
        return chattingRoom.getNo();
    }

    public ChattingRoom getRoomInfo(Long chattingRoomNo) {
        return sqlSession.selectOne("chattingroom.getRoomInfo", chattingRoomNo);
    }
}
