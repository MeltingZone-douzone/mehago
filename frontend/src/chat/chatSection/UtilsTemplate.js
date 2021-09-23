import React, { useState } from 'react';
import styled from 'styled-components';
import ChatRoomSetting from './components/ChatRoomSetting';
import ChatUtilFile from './components/ChatUtilFile';
import ChatUtilNotice from './components/ChatUtilNotice';
import ChatUtilTodoList from './components/ChatUtilTodoList';

import UtilsHeader from './components/UtilsHeader';



export default function UtilsTemplate({isOnChatSection}) {

    const [activity, setActivity] = useState("notice"); // 실행되는 작업

    const handleActivity = (value) => {
        switch(value) {
            case "notice" : setActivity("notice");
                break;
            case "todo" : setActivity("todo");
                break;
            case "file" : setActivity("file");
                break;
            case "setting" : setActivity("setting");
                break;
        }
    }

    const getUtilComponent = () => {
        switch(activity) {
            case "notice" : return <ChatUtilNotice />;
                break;
            case "todo" : return <ChatUtilTodoList />;
                break;
            case "file" : return <ChatUtilFile />;
                break;
            case "setting" : return <ChatRoomSetting />;
                break;
        }
    }

    return(
        <Template>
            <UtilsHeaderWrapper>
                <UtilsHeader isOnChatSection={isOnChatSection} handleActivity={handleActivity} activity={activity}/>
            </UtilsHeaderWrapper>
            <UtilsContentWrapper>
                {getUtilComponent()}
            </UtilsContentWrapper>
        </Template>
    )
}

const Template = styled.div`
    width:100%;
    height:100%;
`

const UtilsHeaderWrapper = styled.div`
    width: 100%;
    height: 10%;
`

const UtilsContentWrapper = styled.div`
    width: 100%;
    height: 90%;
    overflow-y: auto;
`