import React from 'react';
import Jdenticon from 'react-jdenticon';

export default function Thumbnail({ thumbnailUrl, nickname }) {
    return (
        <>
            {
                thumbnailUrl ?
                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={thumbnailUrl} alt={"thumbnailUrl"} />
                    :
                    <Jdenticon value={nickname} />
            }
        </>
    )
}
// 이전의메시지가 없거나(true)  이전메시지의 no와 현재메시지의 no가 다르고 state가 1이 아닌경우


// !previousMessage || previousMessage.participantNo !== message.participantNo && previousMessage.state !== 1
//  previousMessage.participantNo !== message.participantNo  내 입장메시지랑 내 메시지랑 여기서 걸림