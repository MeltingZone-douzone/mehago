package com.douzone.mehago.service;

import com.douzone.mehago.repository.AlarmRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AlarmService {
    
    private final AlarmRepository alarmRepository;
}
