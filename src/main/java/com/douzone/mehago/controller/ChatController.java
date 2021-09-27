package com.douzone.mehago.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.douzone.mehago.repository.NoticeRepository;
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
import com.douzone.mehago.utils.JwtTokenUtil;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.ChatRoom;
import com.douzone.mehago.vo.FileUpload;
import com.douzone.mehago.vo.Message;
import com.douzone.mehago.vo.NonMember;
import com.douzone.mehago.vo.Participant;
import com.douzone.mehago.vo.Todo;
import com.douzone.mehago.vo.TokenInfo;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Auth
@RequestMapping("/api/chat")
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final FileUploadService fileUploadService;
    private final ChatRoomService chatRoomService;
    private final ParticipantService participantService;
    private final TagService tagService;
    private final MessageService messageService;
    private final JwtTokenUtil jwtTokenUtil;
    private final NoticeService noticeService;
    private final TodoService todoService;

    @Auth(role = "ACCOUNT")
    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@AuthUser TokenInfo auth, @ModelAttribute ChatRoom chatRoom,
            MultipartFile file) {
        Account account = new Account(auth);
        boolean result = false;
        // 1. 채팅방 생성
        String url = "";

        if (file != null) {
            url = fileUploadService.restore("chatroom", file);
        }

        chatRoom.setOwner(account.getNo());
        chatRoom.setThumbnailUrl(url);
        chatRoom.setIsDeleted(false);
        Long roomNo = chatRoomService.createRoom(chatRoom);

        // 2. 참가자 생성
        Participant participant = new Participant();
        participant.setAccountNo(account.getNo());
        participant.setChatNickname(account.getNickname());
        participant.setNotReadCount(0);
        participant.setChatRoomNo(roomNo);
        participant.setFavoriteRoom(false);
        Long participantNo = participantService.createParticipant(participant);

        // 3. 태그 생성
        result = tagService.createTags(chatRoom.getNo(), chatRoom.getTagName());
        System.out.println(result);

        // chatRoomNo, participantNo return 해야됨... (페이지 이동)
        return ResponseEntity.ok().body(participantNo);
    }

    @GetMapping("/roomInfo/{chatRoomNo}")
    public ResponseEntity<?> getRoomInfo(@PathVariable Long chatRoomNo) {
        ChatRoom result = chatRoomService.getRoomInfo(chatRoomNo);
        result.setPassword("");

        List<String> tag = chatRoomService.getTagName(chatRoomNo);
        result.setTagName(tag);
        return ResponseEntity.ok()
                .body(result != null ? CommonResponse.success(result) : CommonResponse.fail("해당 채팅방이 존재하지 않습니다"));
    }

    @GetMapping("/getMessageList/{chatRoomNo}")
    public ResponseEntity<?> getMessageList(@PathVariable Long chatRoomNo, String offset) {
        List<Message> list = messageService.getMessageList(chatRoomNo, Long.parseLong(offset));
        return ResponseEntity.ok()
                .body(list != null ? CommonResponse.success(list) : CommonResponse.fail("해당 채팅방에 메세지가 존재하지 않습니다"));
    }

    @GetMapping("/participantInfo/{chatRoomNo}")
    public ResponseEntity<?> getParticipantInfo(@AuthUser TokenInfo auth, @PathVariable Long chatRoomNo) {
        Participant participant = new Participant();
        if (auth.getIsNonMember() == true) {
            // 비회원일때
            participant = participantService.getnonMemberInfo(auth.getNo(), chatRoomNo);
        } else {
            Account account = new Account(auth);
            participant = participantService.getParticipantInfo(account, chatRoomNo);
        }
        return ResponseEntity.ok().body(participant != null ? CommonResponse.success(participant)
                : CommonResponse.fail("해당 채팅방에 해당 참여자가 존재하지 않습니다"));
    }

    // 비회원 getParticipantInfo
    // @Auth
    // @GetMapping("/participantInfo/{chatRoomNo}")
    // public ResponseEntity<?> getParticipantInfo(String chatNickname,
    // @PathVariable Long chatRoomNo)

    @GetMapping("/getAllChatList")
    public ResponseEntity<?> getAllChatList(String offset) {
        List<Map<String, Object>> list = chatRoomService.getAllChatList(offset);
        getTagName(list);
        return ResponseEntity.ok()
                .body(list != null ? CommonResponse.success(list) : CommonResponse.fail("채팅방이 없습니다. 채팅방을 개설해주세요."));
    }

    @GetMapping("/participatingRoom")
    public ResponseEntity<?> participatingRoom(@AuthUser TokenInfo auth) {
        List<Map<String, Object>> participatingRoom;
        if (auth.getIsNonMember() == true && auth.getNo() == null) {
            return ResponseEntity.ok().body(CommonResponse.fail("not exist participantingRoom"));
        }

        if (auth.getIsNonMember() == false) {
            participatingRoom = chatRoomService.participatingRoom(auth.getNo());
        } else {
            participatingRoom = chatRoomService.getRoomInfoNonMember(auth.getNo());
        }

        return ResponseEntity.ok().body(participatingRoom.size() != 0 ? CommonResponse.success(participatingRoom)
                : CommonResponse.fail("not exist participantingRoom"));
    }

    @Auth(role = "ACCOUNT")
    @PostMapping("/fileUpload")
    public ResponseEntity<?> fileUpload(String chatRoomNo, String participantNo, List<MultipartFile> files) {
        FileUpload file = new FileUpload();
        file.setChatRoomNo(Long.valueOf(chatRoomNo));
        file.setParticipantNo(Long.valueOf(participantNo));
        boolean result = false;
        for (int i = 0; i < files.size(); i++) {
            file.setUrl(fileUploadService.restore("chatroom", files.get(i)));
            result = fileUploadService.addFile(file);
        }
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }

    @GetMapping("/getFileList/{chatRoomNo}")
    public ResponseEntity<?> getFileList(@PathVariable String chatRoomNo) {
        List<FileUpload> list = fileUploadService.getFileList(Long.valueOf(chatRoomNo));
        return ResponseEntity.ok()
                .body(list != null ? CommonResponse.success(list) : CommonResponse.fail("해당 채팅방에 올린 파일이 없습니다."));
    }

    @GetMapping("/participants/{chatRoomNo}")
    public ResponseEntity<?> getParticipantsList(@PathVariable Long chatRoomNo) {
        List<Participant> list = participantService.getParticipantsList(chatRoomNo);
        return ResponseEntity.ok()
                .body(list != null ? CommonResponse.success(list) : CommonResponse.fail("참여중인 채팅방이 없습니다."));
    }

    @GetMapping("/todo/{chatRoomNo}")
    public ResponseEntity<?> getTodoList(@PathVariable Long chatRoomNo) {
        List<Todo> list = todoService.getTodoList(chatRoomNo);
        return ResponseEntity.ok()
                .body(list != null ? CommonResponse.success(list) : CommonResponse.fail("해당 채팅방에 To-Do가 존재하지 않습니다"));
    }

    @Auth(role = "ACCOUNT")
    @PostMapping("/todo")
    public ResponseEntity<?> addTodo(@RequestBody Todo todo) {
        Long tagNo = todoService.addTodo(todo);
        return ResponseEntity.ok()
                .body(tagNo != null ? CommonResponse.success(tagNo) : CommonResponse.fail("To-Do 리스트 추가를 실패했습니다"));
    }

    @Auth(role = "ACCOUNT")
    @PutMapping("/todo/{todoNo}")
    public ResponseEntity<?> updateCheckTodo(@PathVariable Long todoNo) {
        Boolean result = todoService.updateCheckTodo(todoNo);
        return ResponseEntity.ok()
                .body(result ? CommonResponse.success(result) : CommonResponse.fail("To-Do check 수정을 실패했습니다."));
    }

    @Auth(role = "ACCOUNT")
    @DeleteMapping("/todo/{todoNo}")
    public ResponseEntity<?> removeTodo(@PathVariable Long todoNo) {
        Boolean result = todoService.removeTodo(todoNo);
        return ResponseEntity.ok()
                .body(result ? CommonResponse.success(result) : CommonResponse.fail("To-Do 삭제를 실패했습니다."));
    }

    @GetMapping("/keywordSearch")
    public ResponseEntity<?> keywordSearch(String searchValue) {
        List<Map<String, Object>> keywordSearch = chatRoomService.keywordSearch(searchValue);
        getTagName(keywordSearch);
        return ResponseEntity.ok().body(
                !keywordSearch.isEmpty() ? CommonResponse.success(keywordSearch) : CommonResponse.fail("검색결과가 없습니다."));
    }

    private void getTagName(List<Map<String, Object>> list) {
        for (int i = 0; i < list.size(); i++) {
            Object no = list.get(i).get("no");
            List<String> tag = chatRoomService.getTagName(Long.parseLong(no.toString()));
            list.get(i).put("tagName", tag);
        }
    }

    @GetMapping("/getSearchMessage")
    public ResponseEntity<?> getSearchMessage(Long chatRoomNo, String searchKeyword) {
        System.out.println(chatRoomNo + ":" + searchKeyword);
        List<Long> messageNo = messageService.getSearchMessage(chatRoomNo, searchKeyword);
        System.out.println(messageNo);
        return ResponseEntity.ok()
                .body(!messageNo.isEmpty() ? CommonResponse.success(messageNo) : CommonResponse.fail("검색결과가 없습니다.")); // 채팅방에
    }

    @PostMapping("/vaildatePassword")
    public ResponseEntity<?> vaildatePassword(@RequestBody ChatRoom chatRoom) {
        boolean result = chatRoomService.checkPassword(chatRoom.getNo(), chatRoom.getPassword());
        return ResponseEntity.ok().body(result);
    }

    @Auth(role = "ACCOUNT")
    @PostMapping("/updateChatRoomInfo")
    public ResponseEntity<?> updateChatRoomInfo(@AuthUser TokenInfo auth, MultipartFile file,
            @ModelAttribute ChatRoom chatRoom) {
        Account account = new Account(auth);
        if (account.getNo() != chatRoom.getOwner()) {
            return ResponseEntity.ok().body(CommonResponse.fail("권한이 아닙니다."));
        }

        boolean result = false;
        String url = "";

        if (file != null) {
            url = fileUploadService.restore("chatroom", file);
            chatRoom.setThumbnailUrl(url);
        }

        result = chatRoomService.updateChatRoomInfo(chatRoom);

        // 수정 전 태그 지우고, 새로 연결시키기
        if (result) {
            tagService.unlinkTags(chatRoom.getNo());
            tagService.createTags(chatRoom.getNo(), chatRoom.getTagName());
        }
        return ResponseEntity.ok().body(CommonResponse.success(chatRoom));
    }

    @Auth(role = "ACCOUNT")
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@AuthUser TokenInfo auth, @RequestBody ChatRoom chatRoom) {
        Account account = new Account(auth);
        if (account.getNo() != chatRoom.getOwner()) {
            return ResponseEntity.ok().body(CommonResponse.fail("권한이 아닙니다."));
        }
        if (chatRoom.getPassword() == "") {
            chatRoom.setSecretRoom(false);
        } else {
            chatRoom.setSecretRoom(true);
        }
        boolean result = chatRoomService.changePassword(chatRoom);
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }

    // 없어도 되지 않나?
    // @GetMapping("isExistsPassword/{no}")
    // public ResponseEntity<?> chatRoomNondisclosure(@PathVariable Long no,
    // @AuthUser TokenInfo account) {
    // Map<String, Boolean> result = new HashMap<>();
    // if (account != null) {
    // result.put("account", true);
    // } else {
    // result.put("account", false);
    // }
    // boolean isExistsPassword = chatRoomService.isExistsPassword(no);
    // result.put("isExistsPassword", isExistsPassword);
    // return ResponseEntity.ok().body(result);
    // }

    // @PostMapping("checkPassword/{no}")
    // public ResponseEntity<?> checkPassword(@PathVariable Long no, @RequestBody
    // Account account) {
    // boolean checkPassword = chatRoomService.checkPassword(no,
    // account.getPassword());
    // return ResponseEntity.ok().body(checkPassword == true ? (checkPassword) :
    // "비밀번호가 틀렸습니다.");
    // }

    @PostMapping("/vaildateNickname")
    public ResponseEntity<?> vaildateNickname(@AuthUser TokenInfo auth, @RequestBody Participant participant) {
        boolean checkNicname = participantService.nicknameValidation(participant);
        String token = "";

        if (checkNicname == false) {
            Long lastReadChatno = participantService.getLastReadChatNo(participant.getChatRoomNo());
            participant.setLastReadChatNo(lastReadChatno);
            NonMember nonMember = new NonMember();
            if (auth.getIsNonMember() == true && auth.getNo() != null) {
                // 이미 들어가있는 채팅방이 있는 경우에는 어떻게 해야 할까????????
                participantService.updateIsDeleted(auth.getNo());
            }

            nonMember.setParticipantNo(participantService.addNonMember(participant));
            nonMember.setNickname(participant.getChatNickname());
            token = jwtTokenUtil.generateAccessToken(nonMember);

        }
        return ResponseEntity.ok()
                .body(checkNicname ? CommonResponse.fail("사용중인 닉네임 입니다.") : CommonResponse.success(token));
    }

    @PostMapping("/updateFavoriteRoom/{chatRoomNo}")
    public ResponseEntity<?> updateFavoriteRoom(@PathVariable Long chatRoomNo, @AuthUser TokenInfo auth,
            @RequestBody Participant participant) {
        List<ChatRoom> favoriteRoomList = null;
        boolean result = false;
        result = participantService.updateFavoriteRoom(chatRoomNo, (auth.getIsNonMember() == true ? 0L : auth.getNo()),
                (auth.getIsNonMember() == true ? auth.getNo() : 0L), participant.getFavoriteRoom());
        if (result) {
            favoriteRoomList = chatRoomService.getFavoriteRoomList((auth.getIsNonMember() == true ? 0L : auth.getNo()),
                    (auth.getIsNonMember() == true ? auth.getNo() : 0L));
        }
        return ResponseEntity.ok().body(favoriteRoomList.size() == 0 ? CommonResponse.success(favoriteRoomList)
                : CommonResponse.fail("not exist participantingRoom"));
    }

    @GetMapping("/getFavoriteRoomList")
    public ResponseEntity<?> getFavoriteRoomList(@AuthUser TokenInfo auth) {
        if (auth.getIsNonMember() == true && auth.getNo() == null) {
            return ResponseEntity.ok().body(CommonResponse.fail("not exist favoriteRoomList"));
        }
        List<ChatRoom> favoriteRoomList = chatRoomService.getFavoriteRoomList(
                (auth.getIsNonMember() == true ? 0L : auth.getNo()),
                (auth.getIsNonMember() == true ? auth.getNo() : 0L));
        System.out.println("favoriteRoomList" + favoriteRoomList.size());
        return ResponseEntity.ok().body(favoriteRoomList.size() != 0 ? CommonResponse.success(favoriteRoomList)
                : CommonResponse.fail("not exist favoriteRoomList"));

    }

    @Auth(role = "ACCOUNT")
    @PostMapping("/deleteChatRoom")
    public ResponseEntity<?> deleteChatRoom(@AuthUser TokenInfo auth, @RequestBody ChatRoom chatRoom) {
        Account account = new Account(auth);
        if (account.getNo() != chatRoom.getOwner()) {
            return ResponseEntity.ok().body(CommonResponse.fail("권한이 아닙니다."));
        }
        boolean result = chatRoomService.deleteChatRoom(chatRoom.getNo());
        return ResponseEntity.ok()
                .body(result ? CommonResponse.success(result) : CommonResponse.fail("채팅방 삭제에 실패했습니다."));
    }

    @GetMapping("/checkIsDeleted")
    public ResponseEntity<?> checkIsDeleted(String chatRoomNo) {
        boolean result = chatRoomService.checkIsDeleted(Long.parseLong(chatRoomNo));
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }

    @DeleteMapping("/exitRoom/{chatRoomNo}")
    public ResponseEntity<?> exitRoom(@PathVariable String chatRoomNo, @AuthUser Account account) {
        boolean result = chatRoomService.exitRoom(Long.parseLong(chatRoomNo), account.getNo());
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }

    @GetMapping("/getNonMemberInfo")
    public ResponseEntity<?> getNonMemberInfo(@AuthUser TokenInfo auth) {
        return ResponseEntity.ok().body(CommonResponse.success(auth));
    }

    @GetMapping("/getNotice/{chatRoomNo}")
    public ResponseEntity<?> getNotice(@PathVariable Long chatRoomNo, @AuthUser Account account) {
        List<Map<String, Object>> noticeList = noticeService.getNotice(chatRoomNo, account.getNo());
        return ResponseEntity.ok().body(CommonResponse.success(noticeList));
    }

    @Auth(role = "ACCOUNT")
    @DeleteMapping("/deleteNotice/{noticeNo}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long noticeNo) {
        boolean result = noticeService.deleteNotice(noticeNo);
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }
}
