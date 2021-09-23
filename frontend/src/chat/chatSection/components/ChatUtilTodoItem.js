import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

const useStyles = theme => ({
    todoItem: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center', /* 세로 가운데 정렬 */
        cursor: 'pointer',
        transition: 'all 0.15s',
        userSelect: 'none',
        '&:hover': {
            background: '#a9d6fe',
            // /* todo-item 에 마우스가 있을때만 .remove 보이기 */
            '&:hover $remove': {
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
        color: '#1C90FC',
        fontWeight: '700',
    }
})

class ChatUtilTodoItem extends Component {
    render() {
        const { text, checked, no, onToggle, onRemove } = this.props;
        const { classes } = this.props;
        return (
            // <div className={classes.todoItem} onClick={() => handleUpdateTodo(no)}>
            <div className={classes.todoItem} onClick={() => onToggle(no)}>
                <div className={classes.remove} onClick={(e) => {
                        e.stopPropagation();
                        onRemove(no)
                }}>
                &times;
                </div>
                <div className={`${classes.todoText} ${checked ? classes.checked : ''}`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className={classes.checkMark}>✓</div>)
                }
            </div>
        );
    }
}

export default withStyles(useStyles)(ChatUtilTodoItem);

