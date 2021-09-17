import React from 'react';

export default function ChatUtilNotice() {
    return(
        <div style={{lineHeight:"1.5rem"}}>
            공지사항 보여주세요! <br/>
            모두 최대한 이쁘게 만들어주세요. 아니 이쁘게 만드세요!!!! <br/>
            각 파일은 chat/chatSection/components/안에 있습니다. <br/>
            <br/>
            <br/>
            그리고 socket을 ChatPage.js로 뺄 것 같습니다. <br/>
            이전에는 socket에 대해 잘 몰라서 어떤식으로 사용해야 할 지 잘몰랐는데<br/>
            지금도 잘 모르지만 <br/>
            chatSection에서 채팅 방 입장(join)과 방 나가는 것(leave? disconnect?)을 잘 처리한다면 <br/>
            유준이 형에게는 미안하지만, 만들었던 현재 네비에 있는 접속하고 있는 인원 수를 쉽게 처리하고 <br/>
            네비에 있는 참여 중인 채팅방에 실시간으로 채팅이 올라온다면 <br/>
            카카오톡처럼 읽지않은 채팅 수를 넣을 수 있을 듯 합니다.<br/>
            그래서 socket에 관련 된 것들은 조금씩 수정이 될 겁니다.<br/>
            <br/>
            <br/>
            팀원 분들은 각자 맡은 페이지에서 데이터 가져오는 방식으로 처리해주세요.<br/>
            그리고... 시간이 남는다면... UI 수정.... 혹은 기능들...<br/>

            프로젝트로 인해 즐거운 추석은 아니지만 즐겁게 보내세요<br/>
            못난 팀장 만나 미안하다!!!!!!!<br/>
        </div>
    )
}