package com.douzone.mehago.service;

import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.NoticeRepository;
import com.douzone.mehago.vo.Notice;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    public Long addNotice(Notice notice) {
        return noticeRepository.addNotice(notice);
    }

    public List<Map<String, Object>> getNotice(Long chatRoomNo, Long accountNo) {
        return noticeRepository.getNotice(chatRoomNo, accountNo);
    }

    public boolean deleteNotice(Long noticeNo) {
        return noticeRepository.deleteNotice(noticeNo);
    }
}
