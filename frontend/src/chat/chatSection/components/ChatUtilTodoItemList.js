import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import ChatUtilTodoItem from './ChatUtilTodoItem';
import styled from 'styled-components';

const madeStyle = theme => ({
    noTodoList: {
        color: '#272727',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingTop:'2em',
        '& p': {
            textAlign: 'center',
            width:'100%',
            paddingTop:'1em',
            color: '#272727' 
        }
    }
})

class ChatUtilTodoItemList extends Component {
    
    /* 
        컴포넌트가 리랜더링할 지 말지 정해준다. 이게 구현되어있지않으면 항상 true를 반환해서 리랜더링함. 
        이를 구현하는 경우에는 업데이트에 영향을 끼치는 조건을 return하면 됨
        즉, todos값이 바뀔 때 리랜러딩하면 되니까 아래와 같이 비교해서 다를 때만 리랜더링을 설정함.

        -> input 값이 onChange될 때 마다 리랜더링이 되었고, input값을 추가 할 때 2번 리랜더링 됐었지만 아래 설정 후 불필요한 리랜더링이 없어짐
    */
   
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }
    
    render() {
        const { todos, onToggle, onRemove} = this.props;
        const { classes } = this.props;
        return(
            Object.keys(todos).length !== 0 ?
            todos.map((todo, index) => 
                <ChatUtilTodoItem
                    key={todo.no}
                    no={todo.no}
                    text={todo.todo}
                    checked={todo.checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                />
            )
            :
            (
            <NonFile>
                <ErrorOutlineIcon/>
                <Text>추가된 To-Do가 없습니다. To-Do를 추가해주세요.</Text>
            </NonFile>
            )
        )
    }
}

export default withStyles(madeStyle)(ChatUtilTodoItemList);



const NonFile = styled.div`
    color: #272727;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 1em;
`
const Text = styled.div`
    text-align: center;
    width: 100%;
    padding-top:1em;
    color: #272727;
`