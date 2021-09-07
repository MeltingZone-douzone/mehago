package com.douzone.mehago.repository;

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

}
