import React, { useEffect, useState, useRef, } from 'react';
import { addTodo, getTodoList, removeTodo, updateCheckTodo } from '../../../../api/ChatApi';
import ChatUtilTodoItemList from './ChatUtilTodoItemList';
import ChatUtilTodoListForm from './ChatUtilTodoListForm';
import ChatUtilTodoListTemplate from './ChatUtilTodoListTemplate';

export default function ChatUtilTodoList({ socket, participantObject, chatRoomNo }) {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');

    const todoAreaRef = React.forwardRef();
    const [offsetNo, setOffsetNo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        socket.on(`todo:room${chatRoomNo}`, result => {
            if (result.purpose === "add") { setTodos([...todos, result.todo]) }
            else if (result.purpose === "update") { setTodos(todos.map((todo) => todo.no === result.todo ? { ...todo, checked: !todo.checked } : todo)) }
            else if (result.purpose === "remove") { setTodos(todos.filter((todo) => todo.no !== result.todo)) }
        })
    }, [todos])

    useEffect(() => {
        getTodos();
    }, [])

    const getTodos = () => {
        getTodoList(chatRoomNo, offsetNo)
            .then(res => {
                if (res.data.result === 'success') {
                    if (res.data.data.length === 0) {
                        setIsEnd(!isEnd);
                    }
                    setTodos(res.data.data);
                    setIsFetching(false);
                };
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const onScroll = (e) => {
        const scrollHeight = e.target.scrollHeight;     // chatRoomAreaRef 의 총 크기
        const fetchPointHeight = scrollHeight * 3 / 4;
        const scrollTop = Math.abs(e.target.scrollTop); // 스크롤해서 올라간 높이
        const clientHeight = e.target.clientHeight;     // 사용자 화면 크기
        if (scrollTop + clientHeight >= fetchPointHeight && !isFetching && !isEnd) {
            fetchChatRooms();
            setIsFetching(true);
        }
    }

    const handleChange = (e) => setInputText(e.target.value);

    const handleToggle = (no) => {
        updateCheckTodo(no)
            .then(res => {
                if (res.data.result === 'success') {
                    socket.emit('todo', "update", no);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleRemove = (no) => {
        removeTodo(no)
            .then(res => {
                if (res.data.result === 'success') {
                    socket.emit('todo', "remove", no);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleAddTodo = () => {
        const todoObject = {
            chatNickname: participantObject.chatNickname,
            chatRoomNo,
            checked: false,
            participantNo: participantObject.no,
            todo: inputText,
        }
        addTodo(todoObject)
            .then(res => {
                if (res.data.result === "success") {
                    todoObject.no = res.data.data;
                    socket.emit("todo", "add", todoObject);
                    setInputText('');
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputText !== '') {
            handleAddTodo();
        }
    }

    return (
        <ChatUtilTodoListTemplate
            onScroll={(e) => onScroll}
            ref={todoAreaRef}
            form={(<ChatUtilTodoListForm
                value={inputText}
                onCreate={handleAddTodo}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            )}>
            <ChatUtilTodoItemList
                todos={todos}
                onToggle={handleToggle}
                onRemove={handleRemove} />
        </ChatUtilTodoListTemplate>
    )
}


