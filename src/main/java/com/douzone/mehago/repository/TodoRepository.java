package com.douzone.mehago.repository;

import com.douzone.mehago.vo.Todo;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TodoRepository {
    private final SqlSession sqlSession;

    public boolean addTodo(Todo todo) {
        return sqlSession.insert("todo.addTodo", todo) == 1 ? true : false;
    }
}
