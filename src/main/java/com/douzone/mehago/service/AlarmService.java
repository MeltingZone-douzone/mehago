package com.douzone.mehago.service;


import java.util.List;

import com.douzone.mehago.repository.AlarmRepository;
import com.douzone.mehago.vo.Alarm;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AlarmService {
    
    private final AlarmRepository alarmRepository;

    public boolean createDeletedChatAlarm(Alarm alarm) {
        return alarmRepository.createDeletedChatAlarm(alarm);
    }

    public List<Alarm> getAlarms(Long no) {
        return alarmRepository.getAlarms(no);
    }

    public boolean updateAlarmReaded(Long no) {
        return alarmRepository.updateAlarmReaded(no);
    }
}
