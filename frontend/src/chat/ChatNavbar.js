import React, { useEffect, useState } from 'react';
import styles from '../assets/sass/chat/Chat.scss';

import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ParticipatingRoom from './ParticipatingRoom';
import ParticipatingMember from './ParticipatingMember';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

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
                <Link to="/chat"><button><HomeIcon /></button></Link>
                <button onClick={() => handleChatList()}><ForumOutlinedIcon /></button>

                <button onClick={() => handleChatMember()}><PeopleAltOutlinedIcon /></button>
            </div>
            <div className={styles.ChatList}>
                {chatList? <ParticipatingRoom />: null}
                {chatMember? <ParticipatingMember />: null}
            </div>
            
        </div>
    );
}
