package com.douzone.mehago.controller;

import java.util.List;

import com.douzone.mehago.responses.CommonResponse;
import com.douzone.mehago.security.Auth;
import com.douzone.mehago.security.AuthUser;
import com.douzone.mehago.service.AlarmService;
import com.douzone.mehago.vo.Alarm;
import com.douzone.mehago.vo.TokenInfo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Auth
@RequestMapping("/api/alarm/")
@Controller
@RequiredArgsConstructor
public class AlarmController {
    
    private final AlarmService alarmService;


    @Auth(role = "ACCOUNT")
    @PostMapping("deleted-chat/create")
    public ResponseEntity<?> createDeletedChatAlarm(@AuthUser TokenInfo auth, @RequestBody Alarm alarm) {
        
        boolean result = alarmService.createDeletedChatAlarm(alarm);

        return ResponseEntity.ok().body(result ? CommonResponse.success(result) : CommonResponse.fail("삭제 알림을 보내는 중 오류가 발생했습니다."));
    }

    @Auth(role = "ACCOUNT")
    @GetMapping("getAlarms")
    public ResponseEntity<?> getAlarms(@AuthUser TokenInfo auth) {
        List<Alarm> alarms = alarmService.getAlarms(auth.getNo());
        return ResponseEntity.ok().body(!alarms.isEmpty() ?  CommonResponse.success(alarms) : CommonResponse.fail("읽지 않은 알림이 존재하지 않습니다."));
    }

    @Auth(role = "ACCOUNT")
    @GetMapping("update/read")
    public ResponseEntity<?> updateAlarmReaded (@AuthUser TokenInfo auth) {
        boolean result = alarmService.updateAlarmReaded(auth.getNo());
        return ResponseEntity.ok().build();
    }
}
