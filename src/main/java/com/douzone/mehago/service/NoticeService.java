package com.douzone.mehago.service;

import com.douzone.mehago.repository.NoticeRepository;
import com.douzone.mehago.vo.Notice;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    public boolean addNotice(Notice notice) {
        return noticeRepository.addNotice(notice);
    }
}
