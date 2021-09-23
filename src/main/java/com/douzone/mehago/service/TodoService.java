package com.douzone.mehago.service;

import java.util.List;

import com.douzone.mehago.repository.TodoRepository;
import com.douzone.mehago.vo.Todo;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public Long addTodo(Todo todo) {
        return todoRepository.addTodo(todo);
    }

    public List<Todo> getTodoList(Long chatRoomNo) {
        return todoRepository.getTodoList(chatRoomNo);
    }

    public Boolean updateCheckTodo(Long todoNo) {
        return todoRepository.updateCheckTodo(todoNo);
    }

    public Boolean removeTodo(Long todoNo) {
        return todoRepository.removeTodo(todoNo);
    }

}
