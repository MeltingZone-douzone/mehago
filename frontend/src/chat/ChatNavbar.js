import React, { useEffect, useState } from 'react';
import styles from '../assets/sass/chat/Chat.scss';

import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ChatList from './ChatList';
import ChatMember from './ChatMember';

export default function ChatNavbar(){
    const [chatList, setChatList] = useState(true);
    const [chatMember, setChatMember] = useState(false);
    
    console.log(`chatList ${chatList}`);
    console.log(`chatMember ${chatMember}`);

    const handleChatList = () => {
        setChatList(true);
        setChatMember(false);
    }

    const handleChatMember = () => {
        setChatList(false);
        setChatMember(true);
    }

    return (
        <div className={styles.Chat}>
            <div className={styles.ChatNavbar}>
                <button onClick={() => handleChatList()}><ForumOutlinedIcon /></button>

                <button onClick={() => handleChatMember()}><PeopleAltOutlinedIcon /></button>
            </div>
            <div className={styles.ChatList}>
                {chatList? <ChatList />: null}
                {chatMember? <ChatMember />: null}
            </div>
        </div>
    );
}
