package com.douzone.mehago.service;

import com.douzone.mehago.repository.TodoRepository;
import com.douzone.mehago.vo.Todo;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public boolean addTodo(Todo todo) {
        return todoRepository.addTodo(todo);
    }

}
