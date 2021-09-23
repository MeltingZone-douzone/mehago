import React, { useEffect, useState, useRef, } from 'react';
import { addTodo, getTodoList, removeTodo, updateCheckTodo } from '../../../../api/ChatApi';
import ChatUtilTodoItemList from './ChatUtilTodoItemList';
import ChatUtilTodoListForm from './ChatUtilTodoListForm';
import ChatUtilTodoListTemplate from './ChatUtilTodoListTemplate';

export default function ChatUtilTodoList({participantObject, chatRoomNo}) {
    const [todos, setTodos] = useState({});
    const [inputText, setInputText] = useState('');

    const todoAreaRef = React.forwardRef();
    const [offsetNo, setOffsetNo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    
    
    useEffect(() => {
        getTodos();
    },[])
    
    const getTodos = () => {
        getTodoList(chatRoomNo, offsetNo) 
            .then(res => {
                if (res.data.result === 'success') {
                    if(res.data.data.length === 0){
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
        console.log("ㅎㅇ");
        const scrollHeight = e.target.scrollHeight;     // chatRoomAreaRef 의 총 크기
        const fetchPointHeight = scrollHeight * 3 / 4;
        const scrollTop = Math.abs(e.target.scrollTop); // 스크롤해서 올라간 높이
        const clientHeight = e.target.clientHeight;     // 사용자 화면 크기
        console.log(scrollHeight, fetchPointHeight, scrollTop, clientHeight);
        if(scrollTop + clientHeight >= fetchPointHeight && !isFetching && !isEnd) {
            console.log("오 ㅎㅇ");
            fetchChatRooms();
            setIsFetching(true);
        }
    }

    const handleChange = (e) => setInputText(e.target.value);

    const handleToggle = (no) => {
        console.log(no);
        updateCheckTodo(no)
            .then(res =>{
                if(res.data.result === 'success') {
                    setTodos(
                        todos.map((todo) =>
                            todo.no === no ? { ...todo, checked: !todo.checked} : todo
                        )
                    )
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleRemove = (no) => {
        removeTodo(no)
            .then(res => {
                if(res.data.result === 'success') {
                    setTodos(
                        todos.filter((todo) => todo.no !== no)
                    )
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
            .then(res =>{
                if(res.data.result === "success") { 
                    setTodos(prevState => [  // selectkey로 no
                        ...prevState, {
                            no: res.data.data,
                            chatNickname: participantObject.chatNickname,
                            chatRoomNo,
                            checked: false,
                            participantNo: participantObject.no,
                            todo: inputText,
                        }
                    ])
                    setInputText('');
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
    console.log(todos);
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleAddTodo();
        }
    }

    return(
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
            onRemove={handleRemove}/>
       </ChatUtilTodoListTemplate>
    )
}


