package com.douzone.mehago.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class AlarmRepository {
    
    private final SqlSession sqlSession;

}
