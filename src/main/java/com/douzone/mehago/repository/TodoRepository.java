package com.douzone.mehago.repository;

import java.util.List;

import com.douzone.mehago.vo.Todo;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TodoRepository {
    private final SqlSession sqlSession;

    public Long addTodo(Todo todo) {
        sqlSession.insert("todo.addTodo", todo);
        return todo.getNo();
    }

    public List<Todo> getTodoList(Long chatRoomNo) {
        return sqlSession.selectList("todo.getTodoList", chatRoomNo);
    }

    public Boolean updateCheckTodo(Long todoNo) {
        return sqlSession.update("todo.updateCheckTodo", todoNo) == 1 ? true : false;
    }

    public Boolean removeTodo(Long todoNo) {
        return sqlSession.delete("todo.removeTodo", todoNo) == 1 ? true : false;
    }
}
