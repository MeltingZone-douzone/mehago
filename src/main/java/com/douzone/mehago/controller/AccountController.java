package com.douzone.mehago.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.douzone.mehago.responses.CommonResponse;
import com.douzone.mehago.security.Auth;
import com.douzone.mehago.security.AuthUser;
import com.douzone.mehago.service.AccountService;
import com.douzone.mehago.service.FileUploadService;
import com.douzone.mehago.service.MailService;
import com.douzone.mehago.utils.JwtTokenUtil;
import com.douzone.mehago.utils.RandomPassword;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.Mail;
import com.douzone.mehago.vo.NonMember;
import com.douzone.mehago.vo.PasswordVo;
import com.douzone.mehago.vo.TokenInfo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/account")
@Controller
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final MailService mailService;
    private final JwtTokenUtil jwtTokenUtil;
    private final FileUploadService fileUploadService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Account account) {
        accountService.signUp(account);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/signup/valid/{name}")
    public ResponseEntity<?> validateAccount(@PathVariable String name, @RequestBody String value) {
        String data = accountService.isExistsData(name, value);
        return ResponseEntity.ok().body(data != null ? data : "null");
    }

    @Auth
    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(@AuthUser TokenInfo auth, HttpServletRequest request) {
        if (auth.getIsNonMember() == true) {
            return ResponseEntity.ok().body(CommonResponse.success("nonMember"));
        }
        Account account = new Account(auth);
        Account result = accountService.getAccountByToken(account);
        System.out.println(result);
        return ResponseEntity.ok().body(CommonResponse.success(result));
    }

    @Auth(role = "ACCOUNT")
    @PostMapping(value = "/update/nickname")
    public ResponseEntity<?> updateNickname(@AuthUser TokenInfo auth, @RequestBody Account account) {
        account.setNo(auth.getNo());
        String token = "";
        boolean result = accountService.updateNickname(account);
        if (result) {
            // token update
            token = jwtTokenUtil.generateAccessToken(account);
        }
        return ResponseEntity.ok()
                .body(result ? CommonResponse.success(token) : CommonResponse.fail("개인 정보 변경을 실패 했습니다."));
    }

    @Auth(role = "ACCOUNT")
    @PostMapping(value = "/update/password")
    public ResponseEntity<?> updatePassword(@AuthUser TokenInfo auth, @RequestBody PasswordVo passwordDto) {
        passwordDto.setNo(auth.getNo());
        boolean result = accountService.updatePassword(passwordDto);

        return ResponseEntity.ok()
                .body(result ? CommonResponse.success(result) : CommonResponse.fail("비밀번호 변경을 실패 했습니다."));
    }

    @Auth(role = "ACCOUNT")
    @PostMapping(value = "/update/userInfo")
    public ResponseEntity<?> updateUserInfo(@AuthUser TokenInfo auth, @RequestBody Account account) {
        account.setNo(auth.getNo());
        boolean result = accountService.updateUserInfo(account);

        return ResponseEntity.ok()
                .body(result ? CommonResponse.success(result) : CommonResponse.fail("개인 정보 변경을 실패 했습니다."));
    }

    @Auth(role = "ACCOUNT")
    @PostMapping("/update/thumbnail")
    public ResponseEntity<?> updateThumbnail(@AuthUser TokenInfo auth, MultipartFile file) {
        Account account = new Account(auth);
        account.setThumbnailUrl(fileUploadService.restore("account", file));
        boolean result = accountService.updateThumbnailUrl(account);

        return ResponseEntity.ok()
                .body(result ? CommonResponse.success(result) : CommonResponse.fail("섬네일 변경을 실패 했습니다."));
    }

    @PostMapping("/findByNameAndEmail")
    public ResponseEntity<?> findByNameAndEmail(@RequestBody Account account, Mail mailDto) {
        Account accountVo = null;
        try {
            String name = account.getName();
            String email = account.getEmail();
            accountVo = accountService.searchAccount(name, email);
            if (accountVo == null) {
                return ResponseEntity.ok().body("false");
            }
            if (accountVo.getEmail() != null) {
                System.out.println("이메일 있음 보낼꺼임");

                String randomPassword = RandomPassword.getRandomPassword(10);
                mailService.mailSend(randomPassword, accountVo.getEmail(), name);
                account.setPassword(randomPassword);
                account.setEmail(email);
                accountService.changeRandomPassword(account);
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return ResponseEntity.ok().body(accountVo);
    }

    @PostMapping("/searchEmail")
    public ResponseEntity<?> searchEmail(@RequestBody Account account) {
        Account accountVo = null;
        try {
            String name = account.getName();
            String phoneNumber = account.getPhoneNumber();
            accountVo = accountService.searchEmail(name, phoneNumber);
            System.out.println(accountVo);
            if (accountVo == null) {
                return ResponseEntity.ok().body("cant find Account");
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        return ResponseEntity.ok().body(accountVo.getEmail());
    }

    @GetMapping("/createNonMember")
    public ResponseEntity<?> createNonMember() {
        NonMember nonMember = new NonMember();
        String token = jwtTokenUtil.generateAccessToken(nonMember);
        return ResponseEntity.ok().body(token);
    }

    @Auth(role = "ACCOUNT")
    @GetMapping("/leaveMember/{accountNo}")
    public ResponseEntity<?> leaveMember(@PathVariable Long accountNo) {
        System.out.println(accountNo);
        accountService.leaveMember(accountNo);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/fileDownload/{fileNo}")
    public void fileDownload(@PathVariable Long fileNo, HttpServletResponse response) throws IOException {
        Map<String, String> map = fileUploadService.getFileName(fileNo);
        String fileName = map.get("url").split("/")[3];
        File file = new File("/uploads-mehago/chatroom/" + fileName);

        String downName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
        response.setHeader("Content-Disposition", "attachment;filename=\"" + downName + "\"");
        response.setContentType("application/octet-stream");

        ServletOutputStream outputStream = response.getOutputStream();
        BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream(file));
        byte[] buffer = new byte[8192];
        int bytesRead = -1;

        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        outputStream.flush();
        inputStream.close();
        outputStream.close();

    }
}
