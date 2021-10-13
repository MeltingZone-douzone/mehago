import React,{ useState } from 'react';
import styled from 'styled-components';
import defaultImage from "../assets/images/black-mehago.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
export default function AlarmContent({alarm}) {

    const [showReason, setShowReason] = useState(false);

    return(
        <AlarmContentTemplate onClick={() => setShowReason(!showReason)}>
            <AlarmContentChat>
                <ChattingRoomImage>
                    <img style={alarm.thumbnailUrl ? {} : {width:"100%", marginTop:"20px"}} src={alarm.thumbnailUrl ? alarm.thumbnailUrl : defaultImage} alt={`${alarm.title}의 이미지`} />   
                </ChattingRoomImage>
                <ChattingRoomContent>
                    {alarm.title}
                    <span>채팅방이 삭제 되었습니다.</span>

                </ChattingRoomContent>
                <Angle>
                    {alarm.reason && <FontAwesomeIcon icon={showReason ? faAngleUp : faAngleDown }/>  }
                </Angle>
            </AlarmContentChat>
            <AlarmContentReason showReason={showReason}>
                {showReason && <ReasonTemplate>
                                {alarm.nickname}님의<span>마지막 메세지입니다.</span>
                                <br/>
                                <br/>
                                <span>{alarm.reason}</span>
                             </ReasonTemplate>
                           }
            </AlarmContentReason>
        </AlarmContentTemplate>
    );
}

const AlarmContentTemplate = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const AlarmContentChat = styled.div`
    display: flex;
    width: 100%;
    
`
const AlarmContentReason = styled.div`

    display: flex;
    width: 95%;
    height: ${({showReason}) => showReason? "fit-content": "0"};
    padding: 5px;
    margin:auto;
    margin-top: 10px;
    background-color: ${({showReason}) => showReason? "#eee": "none"};
    border-radius: 8px;
`

const ChattingRoomImage = styled.div`
    width: 45px;
    height: 45px;

    overflow:hidden;

    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:2em;
`

const ChattingRoomContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    font-weight: bold;

    span {
        margin:auto 0;
        font-size:.8rem;
        font-weight:300
    }
`

const ReasonTemplate = styled.div`
    font-weight: bold;
    font-size:.8rem;

    span{
        margin-left:5px;
        font-weight: 300;
    }
`

const Angle = styled.div`
    margin-left: auto;
`