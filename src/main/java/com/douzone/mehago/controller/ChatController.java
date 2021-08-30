package com.douzone.mehago.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.security.Auth;
import com.douzone.mehago.security.AuthUser;
import com.douzone.mehago.service.ChattingRoomService;
import com.douzone.mehago.service.ParticipantService;
import com.douzone.mehago.service.TagService;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.ChattingRoom;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Participant;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;


@RequestMapping("/api/chat")
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChattingRoomService chattingRoomService;
    private final ParticipantService participantService;
    private final TagService tagService;

    @Auth
    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@AuthUser Account auth, @RequestBody ChattingRoom chattingRoom) {
        boolean result = false;
        // 1. 채팅방 생성
        chattingRoom.setOwner(auth.getNo());
        chattingRoom.setThumbnailUrl("");
        Long roomNo = chattingRoomService.createRoom(chattingRoom);
        // 2. 참가자 생성
        Participant participant = new Participant();
        participant.setAccountNo(auth.getNo());
        participant.setChatNickname(auth.getNickname());
        participant.setChattingRoomNo(roomNo);
        Long participantNo = participantService.createParticipant(participant);
        // 3. 태그 생성
        result = tagService.createTags(chattingRoom.getNo(), chattingRoom.getTagName());

        return ResponseEntity.ok().body(participantNo);
    }

    @PostMapping("/addMessage")
    public ResponseEntity<?> addMessage(@AuthUser Account auth, @RequestBody Message message) {
        Long messageNo = participantService.addMessage(message);
        return ResponseEntity.ok().body(messageNo);
    }

    @Auth
    @PostMapping("/participantNo")
    public ResponseEntity<?> getParticipantNo(@AuthUser Account auth, @RequestBody Message message) {
        System.out.println( auth.getNo());
        Map<String, Long> map = new HashMap();
        map.put("accountNo", auth.getNo());
        map.put("chattingRoomNo", message.getChattingRoomNo());
        return ResponseEntity.ok().body(participantService.getParticipantNo(map));
    }

    @PostMapping("/chatList")
    public ResponseEntity<?> getChatList(){
        List<ChattingRoom> chattingRoomList = chattingRoomService.getChatRoomList();
        return ResponseEntity.ok().body(chattingRoomList);
    }
    

}