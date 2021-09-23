package com.douzone.mehago.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.vo.Notice;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class NoticeRepository {
    private final SqlSession sqlSession;

    public boolean addNotice(Notice notice) {
        return sqlSession.insert("notice.addNotice", notice) == 1 ? true : false;
    }

    public List<Map<String, Object>> getNotice(Long chatRoomNo, Long accountNo) {
        Map<String, Long> map = new HashMap<>();
        map.put("chatRoomNo", chatRoomNo);
        map.put("accountNo", accountNo);
        return sqlSession.selectList("notice.getNotice", map);
    }

    public boolean deleteNotice(Long noticeNo) {
        
        return sqlSession.delete("notice.deleteNotice", noticeNo) == 1 ? true : false;
    }

}
