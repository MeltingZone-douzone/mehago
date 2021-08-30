package com.douzone.mehago.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.security.Auth;
import com.douzone.mehago.security.AuthUser;
import com.douzone.mehago.service.ChattingRoomService;
import com.douzone.mehago.service.MessageService;
import com.douzone.mehago.service.ParticipantService;
import com.douzone.mehago.service.TagService;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.ChattingRoom;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Participant;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
    private final MessageService messageService;

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
        // chatRoomNo, participantNo return 해야됨... (페이지 이동)
        return ResponseEntity.ok().body(participantNo);
    }

    @PostMapping("/addMessage")
    public ResponseEntity<?> addMessage(@AuthUser Account auth, @RequestBody Message message) {
        Long messageNo = participantService.addMessage(message);
        return ResponseEntity.ok().body(messageNo);
    }

    
    // @PostMapping("/participantInfo")
    // public ResponseEntity<?> getParticipantInfo(@AuthUser Account auth, @RequestBody Message message) {
    @Auth
    @GetMapping("/roomInfo")
    public ResponseEntity<?> getRoomInfo(String chattingRoomNo) {
        ChattingRoom result = chattingRoomService.getRoomInfo(Long.parseLong(chattingRoomNo));
        System.out.println(result);
        return ResponseEntity.ok().body(chattingRoomService.getRoomInfo(Long.parseLong(chattingRoomNo)));
    }

    @Auth
    @GetMapping("/participantInfo")
    public ResponseEntity<?> getParticipantInfo(@AuthUser Account auth, String chattingRoomNo) {
        Map<String, Long> map = new HashMap();
        map.put("accountNo", auth.getNo());
        map.put("chattingRoomNo", Long.parseLong(chattingRoomNo));
        Participant result = participantService.getParticipantInfo(map);
        return ResponseEntity.ok().body(participantService.getParticipantInfo(map));
    }

    @Auth
    @GetMapping("/getMessageList")
    public ResponseEntity<?> getMessageList(String chattingRoomNo) {
        System.out.println("개새");
        List<Message> list = messageService.getMessageList(Long.parseLong(chattingRoomNo));
        System.out.println(list);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping("/updateNotReadCount")
    public ResponseEntity<?> updateNotReadCount(@RequestBody Message message) {
        System.out.println("updateNotReadCount" + message.toString());
        return ResponseEntity.ok().body(messageService.updateNotReadCount(message));
    }

}