import { makeStyles } from '@material-ui/core/styles';
import { m } from 'framer-motion';
import React, { Component } from 'react';

class ChatUtilTodoItem extends Component {
    render() {
        const classes = useStyles();
        const { text, checked, id, onToggle, onRemove } = this.props;

    
        return (
            <div className={classes.todoItem} onClick={() => onToggle(id)}>
                <div className={classes.remove} onClick={(e) => {
                    e.stopPropagation(); // onToggle이 실행되지 않도록
                    onRemove(id);
                }}>&times;</div>
                <div className={`${classes.todoText} ${checked ? 'checked' : ''}`}>
                    <div>{text}</div>
                </div>
                {
                    checked &&  (<div className={classes.checkMark}>✅</div>)
                }
            </div>
        );
    }
}

export default ChatUtilTodoItem;

const useStyles = makeStyles((theme) => ({
    todoItem: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center', /* 세로 가운데 정렬 */
        cursor: 'pointer',
        transition: 'all 0.15s',
        userSelect: 'none',
        '&:hover': {
            background: '#e3fafc',
            // /* todo-item 에 마우스가 있을때만 .remove 보이기 */
            remove: {
                opacity: '1',
            }
        },
        '& + todoItem': {
            borderTop: '1px solid #f1f3f5',
        }
    },
    // /* todo-item 에 마우스가 있을때만 .remove 보이기 */
    // todoItem:hover .remove: {
    //     opacity: '1',
    // },
      
      /* todo-item 사이에 윗 테두리 */
    // todoItem + todoItem: {
    //     borderTop: '1px solid #f1f3f5',
    // },
      
    remove: {
        marginRight: '1rem',
        color: '#e64980',
        fontWeight: '600',
        opacity: '0',
    },
      
    todoText: {
        flex: '1', /* 체크, 엑스를 제외한 공간 다 채우기 */
        wordBreak: 'break-all',
    },
      
    checked: {
        textDecoration: 'line-through',
        color: '#adb5bd',
    },
      
    checkMark: {
        fontSize: '1.5rem',
        lineHeight: '1rem',
        marginLeft: '1rem',
        color: '#3bc9db',
        fontWeight: '800',
    }
}))