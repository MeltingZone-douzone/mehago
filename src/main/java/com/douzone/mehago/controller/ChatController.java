package com.douzone.mehago.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.server.PathParam;

import com.douzone.mehago.responses.CommonResponse;
import com.douzone.mehago.security.Auth;
import com.douzone.mehago.security.AuthUser;
import com.douzone.mehago.service.ChatRoomService;
import com.douzone.mehago.service.FileUploadService;
import com.douzone.mehago.service.MessageService;
import com.douzone.mehago.service.NoticeService;
import com.douzone.mehago.service.ParticipantService;
import com.douzone.mehago.service.TagService;
import com.douzone.mehago.service.TodoService;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.ChatRoom;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.Notice;
import com.douzone.mehago.vo.Participant;
import com.douzone.mehago.vo.Todo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/chat")
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final FileUploadService fileUploadService;
    private final ChatRoomService chatRoomService;
    private final ParticipantService participantService;
    private final TagService tagService;
    private final MessageService messageService;
    private final TodoService todoService;
    private final NoticeService noticeService;

    @Auth
    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@AuthUser Account auth, @ModelAttribute ChatRoom chatRoom, MultipartFile file) {

        boolean result = false;
        // 1. 채팅방 생성
        String url = "";

        if(file != null) {
            url = fileUploadService.restore("chatroom",file);
        }

        chatRoom.setOwner(auth.getNo());
        chatRoom.setThumbnailUrl(url);
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

    @Auth
    @GetMapping("/roomInfo/{chatRoomNo}")
    public ResponseEntity<?> getRoomInfo(@PathVariable Long chatRoomNo) {
        ChatRoom result = chatRoomService.getRoomInfo(chatRoomNo);
        return ResponseEntity.ok()
                .body(result != null ? CommonResponse.success(result) : CommonResponse.fail("해당 채팅방이 존재하지 않습니다"));
    }

    @Auth
    @GetMapping("/getMessageList/{chatRoomNo}")
    public ResponseEntity<?> getMessageList(@PathVariable Long chatRoomNo, String offset) {
        List<Message> list = messageService.getMessageList(chatRoomNo, Long.parseLong(offset));
        return ResponseEntity.ok()
                .body(list != null ? CommonResponse.success(list) : CommonResponse.fail("해당 채팅방에 메세지가 존재하지 않습니다"));
    }

    @Auth
    @GetMapping("/participantInfo/{chatRoomNo}")
    public ResponseEntity<?> getParticipantInfo(@AuthUser Account auth, @PathVariable Long chatRoomNo) {
        Participant result = participantService.getParticipantInfo(auth, chatRoomNo);
        return ResponseEntity.ok().body(
                result != null ? CommonResponse.success(result) : CommonResponse.fail("해당 채팅방에 해당 참여자가 존재하지 않습니다"));
    }

    // 비회원 getParticipantInfo
    // @Auth
    // @GetMapping("/participantInfo/{chatRoomNo}")
    // public ResponseEntity<?> getParticipantInfo(String chatNickname,
    // @PathVariable Long chatRoomNo)

    @PostMapping("/chatList")
    public ResponseEntity<?> getAllChatList() {
        List<Map<String, Object>> list = chatRoomService.getAllChatList();
        getTagName(list);
        return ResponseEntity.ok().body(list);
    }

    @Auth
    @GetMapping("/participatingRoom")
    public ResponseEntity<?> participatingRoom(@AuthUser Account account) {
        List<Map<String, Object>> participatingRoom = chatRoomService.participatingRoom(account.getNo());
        getTagName(participatingRoom);
        return ResponseEntity.ok().body(CommonResponse.success(participatingRoom));
    }

    @GetMapping("/participants/{chatRoomNo}")
    public ResponseEntity<?> getParticipantsList(@PathVariable Long chatRoomNo) {
        System.out.println(chatRoomNo); 
        List<Participant> list = participantService.getParticipantsList(chatRoomNo);
        System.out.println(list);
        return ResponseEntity.ok().body(
            list != null ? CommonResponse.success(list) : CommonResponse.fail("해당 채팅방에 참여자가 존재하지 않습니다")
        );
    }

    @PostMapping("/addTodo")
    public ResponseEntity<?> addTodo(@RequestBody Todo todo) {
        boolean result = false;
        result = todoService.addTodo(todo);
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }

    @PostMapping("/addNotice")
    public ResponseEntity<?> addNotice(@RequestBody Notice notice) {
        boolean result = false;
        result = noticeService.addNotice(notice);
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }

    @GetMapping("/keywordSearch")
    public ResponseEntity<?> keywordSearch(String searchValue) {
        List<Map<String, Object>> keywordSearch = chatRoomService.keywordSearch(searchValue);
        getTagName(keywordSearch);   // 방 만들때 테그 없으면 제목도 검색이 안댐 수정 할 거임
        return ResponseEntity.ok().body(!keywordSearch.isEmpty() ? CommonResponse.success(keywordSearch) : CommonResponse.fail("검색결과가 없습니다."));
    }

    private void getTagName(List<Map<String, Object>> list) {
        for (int i = 0; i < list.size(); i++) {
            Object no = list.get(i).get("no");
            List<String> tag = chatRoomService.getTagName(Long.parseLong(no.toString()));
            list.get(i).put("tagName", tag);
        }
    }

    @Auth
    @GetMapping("/getSearchMessage")
    public ResponseEntity<?> getSearchMessage(String searchKeyword) {
        List<Long> messageNo = messageService.getSearchMessage(searchKeyword);
        return ResponseEntity.ok().body(messageNo != null ? CommonResponse.success(messageNo) : "검색결과가 없습니다."); // 채팅방에
                                                                                                                // 없음
    }

    @Auth
    @GetMapping("isExistsPassword/{no}")
    public ResponseEntity<?> chatRoomNondisclosure(@PathVariable Long no, @AuthUser Account account) {
        Map<String, Boolean> result = new HashMap<>(); 
        if(account != null){
            result.put("account", true);
        } else {
            result.put("account", false);
        }        
        boolean isExistsPassword = chatRoomService.isExistsPassword(no);
        result.put("isExistsPassword", isExistsPassword);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("checkPassword/{no}")
    public ResponseEntity<?> checkPassword(@PathVariable Long no, @RequestBody Account account) {
        boolean checkPassword = chatRoomService.checkPassword(no, account.getPassword());
        return ResponseEntity.ok().body(checkPassword == true ? (checkPassword) : "비밀번호가 틀렸습니다.");
    }
    @PostMapping("/nicknameValidation")
    public ResponseEntity<?> nicknameValidation(@RequestBody Participant participant) {
        boolean checkNicname = participantService.nicknameValidation(participant);
        if(checkNicname == false){
            Long lastReadChatno = participantService.getLastReadChatNo(participant.getChatRoomNo());
            participant.setLastReadChatNo(lastReadChatno);
            participantService.addNonMember(participant);
        }
        return ResponseEntity.ok().body(checkNicname ? "사용중인 닉네임 입니다." : true);
    }
}