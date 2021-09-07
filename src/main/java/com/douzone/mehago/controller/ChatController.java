package com.douzone.mehago.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.responses.CommonResponse;
import com.douzone.mehago.security.Auth;
import com.douzone.mehago.security.AuthUser;
import com.douzone.mehago.service.ChatRoomService;
import com.douzone.mehago.service.MessageService;
import com.douzone.mehago.service.ParticipantService;
import com.douzone.mehago.service.TagService;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.ChatRoom;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Participant;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/chat")
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatRoomService chatRoomService;
    private final ParticipantService participantService;
    private final TagService tagService;
    private final MessageService messageService;

    @Auth
    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@AuthUser Account auth, @RequestBody ChatRoom chatRoom) {
        boolean result = false;
        // 1. 채팅방 생성
        chatRoom.setOwner(auth.getNo());
        chatRoom.setThumbnailUrl("");
        Long roomNo = chatRoomService.createRoom(chatRoom);
        // 2. 참가자 생성
        Participant participant = new Participant();
        participant.setAccountNo(auth.getNo());
        participant.setChatNickname(auth.getNickname());
        participant.setNotReadCount(0);
        participant.setChatRoomNo(roomNo);
        Long participantNo = participantService.createParticipant(participant);
        // 3. 태그 생성
        result = tagService.createTags(chatRoom.getNo(), chatRoom.getTagName());
        System.out.println(result);
        
        // chatRoomNo, participantNo return 해야됨... (페이지 이동)
        return ResponseEntity.ok().body(participantNo);
    }

    @PostMapping("/addMessage")
    public ResponseEntity<?> addMessage(@AuthUser Account auth, @RequestBody Message message) {
        // 1. 채팅방 전체 멤버 가져와서 add message
        Long chatMember = participantService.getChatMember(message.getChatRoomNo());
        message.setNotReadCount(chatMember);
        Long result = messageService.addMessage(message);
        message.setNo(result);
        // 2. 채팅방의 participant에 not_read_chat 의 숫자를 +1
        participantService.addNotReadCount(message);
        return ResponseEntity.ok().body(message);
    }

    @Auth
    @GetMapping("/roomInfo/{chatRoomNo}")
    public ResponseEntity<?> getRoomInfo(@PathVariable Long chatRoomNo) {
        ChatRoom result = chatRoomService.getRoomInfo(chatRoomNo);
        return ResponseEntity.ok().body(result != null ? CommonResponse.success(result) : CommonResponse.fail("해당 채팅방이 존재하지 않습니다"));
    }

    @Auth
    @GetMapping("/getMessageList/{chatRoomNo}")
    public ResponseEntity<?> getMessageList(@PathVariable Long chatRoomNo, String offset) {

        System.out.println(chatRoomNo);
        System.out.println(offset);
        List<Message> list = messageService.getMessageList(chatRoomNo, Long.parseLong(offset));
        System.out.println(list);
        return ResponseEntity.ok().body(list != null ? CommonResponse.success(list) : CommonResponse.fail("해당 채팅방에 메세지가 존재하지 않습니다"));
    }

    @Auth
    @GetMapping("/participantInfo/{chatRoomNo}")
    public ResponseEntity<?> getParticipantInfo(@AuthUser Account auth, @PathVariable Long chatRoomNo) {
        Participant result = participantService.getParticipantInfo(auth, chatRoomNo);
        return ResponseEntity.ok().body(result != null ? CommonResponse.success(result) : CommonResponse.fail("해당 채팅방에 해당 참여자가 존재하지 않습니다"));
    }

    // 비회원 getParticipantInfo
    // @Auth
    // @GetMapping("/participantInfo/{chatRoomNo}")
    // public ResponseEntity<?> getParticipantInfo(String chatNickname, @PathVariable Long chatRoomNo)

    @PostMapping("/updateNotReadCount")
    public ResponseEntity<?> updateNotReadCount(@RequestBody Message message) {
        messageService.updateNotReadCount(message);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/updateLastReadNo")
    public ResponseEntity<?> updateLastReadNo(@RequestBody Participant participant) {
        // 접속중이라면 마지막 읽은 채팅창 번호를 update 시켜줘야 한다.
        participantService.updateLastReadNo(participant);
        return ResponseEntity.ok().body(participant);
    }

    @PostMapping("/joinParticipant")
    public ResponseEntity<?> joinParticipant(@RequestBody Participant participant) {
        // message not_read_count를 줄여줘야 해.
        messageService.subtractNotReadCount(participant);
        // 채팅방 join을 하면 readcount들이 업데이트 되어야 함 !
        participantService.updateReadCountOfJoin(participant);
        return ResponseEntity.ok().build();
    }

    
    @PostMapping("/chatList")
    public ResponseEntity<?> getChatList() {
        List<ChatRoom> chatRoomList = chatRoomService.getChatRoomList();
        getTagName(chatRoomList);
        return ResponseEntity.ok().body(chatRoomList);
    }

    @Auth
    @GetMapping("/participatingRoom")
    public ResponseEntity<?> participatingRoom(@AuthUser Account account){
        List<ChatRoom> participatingRoom = chatRoomService.participatingRoom(account.getNo());
        getTagName(participatingRoom);
        return ResponseEntity.ok().body(CommonResponse.success(participatingRoom));
    }

    @GetMapping("/keywordSearch")
    public ResponseEntity<?> keywordSearch(String searchValue) {
        List<ChatRoom> keywordSearch = null;
        if(searchValue != null){
            keywordSearch = chatRoomService.keywordSearch(searchValue);
            getTagName(keywordSearch);
        }
        return ResponseEntity.ok().body(keywordSearch != null ? CommonResponse.success(keywordSearch) : "검색결과가 없습니다.");
    }

    private void getTagName(List<ChatRoom> room) {
        for(int i=0 ; i< room.size() ; i++){
            Long no = room.get(i).getNo();
            List<String> tag = chatRoomService.getTagName(no);
            room.get(i).setTagName(tag);
        }
    }
    @Auth
    @GetMapping("/getSearchMessage")
    public ResponseEntity<?> getSearchMessage(String searchKeyword) {
        System.out.println(searchKeyword);
        List<Long> messageNo = messageService.getSearchMessage(searchKeyword);
        System.out.println(messageNo);
        return ResponseEntity.ok().body(messageNo != null ? CommonResponse.success(messageNo) : "검색결과가 없습니다."); //  채팅방에 검색한 결과가 없음
    }

}