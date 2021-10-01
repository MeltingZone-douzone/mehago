package com.douzone.mehago.controller;

import com.douzone.mehago.security.Auth;
import com.douzone.mehago.security.AuthUser;
import com.douzone.mehago.service.AlarmService;
import com.douzone.mehago.vo.Alarm;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Auth
@RequestMapping("/api/alarm")
@Controller
@RequiredArgsConstructor
public class AlarmController {
    
    private final AlarmService alarmService;


    // @Auth(role = "ACCOUNT")
    // @PostMapping("deleted-chat/create")
    // public ResponseEntity<?> createDeletedChatAlarm(@AuthUser TokenIn auth, @RequestBody Alarm alarm) {
        

    //     return ResponseEntity.ok().build();
    // }

}
