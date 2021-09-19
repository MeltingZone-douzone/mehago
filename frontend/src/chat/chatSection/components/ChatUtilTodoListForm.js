import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const ChatUtilTodoListForm = ({value, onChange, onCreate, onKeyPress}) => {
    const classes = useStyles();  
    return (
        <div className={classes.form}>
        <input 
            value={value} 
            onChange={onChange} 
            onKeyPress={onKeyPress}/>
        <div className={classes.createButton} onClick={onCreate}>
            추가
        </div>
        </div>
    );
};

export default ChatUtilTodoListForm;

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex'
    },
    formInput: {
        flex: '1', /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
        fontSize: '1.25rem',
        outline: 'none',
        border: 'none',
        borderBottom: '1px solid #c5f6fa',
    },
    createButton: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        marginLeft: '1rem',
        background: '#1C90FC',
        borderRadius: '3px',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        '&:hover': {
            background: '#40a3fd'
        }
    },
}));