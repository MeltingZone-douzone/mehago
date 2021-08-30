package com.douzone.mehago.service;


import com.douzone.mehago.utils.MailHandler;
import com.douzone.mehago.vo.Mail;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailService {
    private JavaMailSender mailSender;
    // private static final String FROM_ADDRESS = "mehagoChat@gmail.com";

    public void mailSend(String rendomPassword, String email, String name) {
        Mail mailDto = new Mail(); 
        try {
            
            mailDto.setAddress("mehagochat@gmail.com");     // email로 변경 해야함

            MailHandler mailHandler = new MailHandler(mailSender);
            // 받는 사람
            mailHandler.setTo(mailDto.getAddress());

            // 보내는 사람
            // mailHandler.setFrom(MailService.FROM_ADDRESS);
            
            // 제목
            mailHandler.setSubject();
            // HTML Layout
            
            mailHandler.setText(name, rendomPassword, true);

            mailHandler.send();
            System.out.println("send");
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}