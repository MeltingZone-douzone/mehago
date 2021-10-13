import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const ChatUtilTodoListTemplate = ({ form, children }) => {
    const classes = useStyles();

    return (
        <main className={classes.todoListTemplate}>
            {/* <div className={classes.title}>
                해야 할 일
            </div> */}
            <section className={classes.formWrapper}>
                {form}
            </section>
            <section className={classes.todosWrapper}>
                {children}
            </section>
        </main>
    );
};

const useStyles = makeStyles((theme) => ({
    todoListTemplate: {
        background: 'white',
        width: '100%',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', /* 그림자 */
        margin: '0 auto', /* 페이지 중앙 정렬 */
        paddingTop:"1em"
    },
    title: {
        padding: '1rem',
        fontSize: '1rem',
        textAlign: 'center',
        fontWeight: '100',
        background: '#2E3B55',
        color: 'white'
    },
    formWrapper: {
        padding: '0.5rem',
        borderBottom: '1px solid #2E3B55'
    },
    todosWrapper: {
        minHeight: '5rem'
    }
}));

export default ChatUtilTodoListTemplate;