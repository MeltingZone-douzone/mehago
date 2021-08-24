package com.douzone.mehago.service;

import com.douzone.mehago.utils.MailHandler;
import com.douzone.mehago.vo.Mail;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
 
    // private static final String FROM_ADDRESS = "mehagoChat@gmail.com";

    private JavaMailSender jSender;


    public void mailSend(Mail mailDto) {
        
        try {
            MailHandler mailHandler = new MailHandler(jSender);

            // 받는 사람
            System.out.println("mailDto.getAddress : " + mailDto.getAddress());
            mailHandler.setTo(mailDto.getAddress());

            // 보내는 사람
            // mailHandler.setFrom(MailService.FROM_ADDRESS);

            // 제목
            mailHandler.setSubject(mailDto.getTitle());

            // TODO 메일 HTML 만들기.
            // HTML Layout (함수로 빼서 만드는 게 좋을듯)
            String htmlContent = "<p>" + mailDto.getMessage() + "</p>" ;
            boolean useHtml = true;
            mailHandler.setText(htmlContent, useHtml);

            mailHandler.send();
            System.out.println("send mail successfully!");
        } catch (Exception e){
            // TODO Exception
            e.printStackTrace();
        }
    }
}
