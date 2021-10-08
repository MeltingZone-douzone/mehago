package com.douzone.mehago.repository;

import java.util.List;

import com.douzone.mehago.vo.Alarm;
import com.douzone.mehago.vo.TokenInfo;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class AlarmRepository {
    
    private final SqlSession sqlSession;

    public boolean createDeletedChatAlarm(Alarm alarm) {
        return sqlSession.insert("alarm.createDeletedChatAlarm",alarm) >= 1 ? true : false;
    }

    public List<Alarm> getAlarms(Long no) {
        return sqlSession.selectList("alarm.findAlarmNotRead", no);
    }

    public boolean updateAlarmReaded(Long no) {
        return sqlSession.update("alarm.updateReadByAccountNo",no) >= 1 ? true : false;
    }

}
