import React from 'react';
import styled from 'styled-components';
import AlarmContent from './AlarmContent';

export default function AlarmToggle ({alarms}) {

    return(
        <AlarmToggleContainer>
            {alarms ?
            alarms.map(alarm =>{
                return( 
                <AlarmContentWrapper key={alarm.no}  alarmReasonExist={alarm.reason ? true : false}>
                    <AlarmContent alarm={alarm}/>
                </AlarmContentWrapper>
                )
            })
            :
                <NotExist><span>읽지 않은 알림이 없습니다..</span></NotExist>
            }
        </AlarmToggleContainer>
    )
}

const AlarmToggleContainer = styled.div`
    display: flex;
    flex-direction:column;

    width:100%;
    min-height: 300px;
    max-height: 800px;
`

const AlarmContentWrapper = styled.div`
    padding: 10px;

    &:hover{
        background-color:${({alarmReasonExist}) => alarmReasonExist ? "#00000015" : null};
    }

    &+&{
        border-top:1px solid #eee;
    }
`

const NotExist = styled.div`
    text-align:center;

`