import React, { useEffect, useState } from 'react';
import styles from '../assets/sass/chat/Chat.scss';

import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ChatNavbarList from './ChatNavbarList';
import ChatMember from './ChatMember';

export default function ChatNavbar(){
    const [chatList, setChatList] = useState(true);
    const [chatMember, setChatMember] = useState(false);

    const handleChatList = () => {
        setChatList(true);
        setChatMember(false);
    }

    const handleChatMember = () => {
        setChatList(false);
        setChatMember(true);
    }

    return (
        <div className={styles.Chat} onClick={(e)=>e.stopPropagation()}>
            <div className={styles.ChatNavbar}>
                <button onClick={() => handleChatList()}><ForumOutlinedIcon /></button>

                <button onClick={() => handleChatMember()}><PeopleAltOutlinedIcon /></button>
            </div>
            <div className={styles.ChatList}>
                {chatList? <ChatNavbarList />: null}
                {chatMember? <ChatMember />: null}
            </div>
            
        </div>
    );
}
