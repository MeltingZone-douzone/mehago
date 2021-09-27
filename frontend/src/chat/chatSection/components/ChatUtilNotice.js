import { Avatar} from '@material-ui/core';
import React from 'react';
import "../../../assets/sass/chat/ChatUtil.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

export default function ChatUtilNotice({ handleDeleteNotice , notice, userInfo}) {

    // const [notice, setNotice] = useState([]);
    // // console.log(chatRoomNo);
    // useEffect(()=> {
    //     try {
    //         getNotice(chatRoomNo).then(res => {
    //             console.log(res.data.data);
    //             setNotice(res.data.data);
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // },[]);

    // const handleDeleteNotice = (noticeNo) =>{
    //     deleteNotice(noticeNo).then(res=>{
    //         // console.log(res.data);
    //         if(res.data.result === "success"){
    //             setNotice(
    //                 notice.filter((notice) => notice.no !== noticeNo)
    //             )
    //         }
    //     })
    // }

    return(
        <div style={{lineHeight:"1.5rem"}} className={"box"}>
                { notice.map((notice, index)=> {
                    return(
                        <div className={"notification"} key={index}>  
                            <Avatar src={notice.thumbnailUrl} />
                            <div className={"text"}>  
                                <p><span className={"notice"}>{notice.notice}</span></p><br/>  
                                <p className={"time"}>{notice.nickname } {notice.createdAt}</p>  
                            </div>
                            {notice.accountNo === userInfo.no ? (
                                    <button className={"deleteNotice"} onClick={(e) => {handleDeleteNotice(notice.no)}}><FontAwesomeIcon icon={faEraser} size={'1x'} /></button>
                                    
                                ):
                                null
                            }
                        </div>                            
                    )
                })}
                
        </div>
    )
}