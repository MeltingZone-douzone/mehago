package com.douzone.mehago.utils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class MailHandler {
    
    private JavaMailSender sender;
    private MimeMessage message;
    private MimeMessageHelper messageHelper;

    // 생성자
    public MailHandler(JavaMailSender jSender) throws MessagingException {
        this.sender = jSender;
        message = jSender.createMimeMessage();
        messageHelper = new MimeMessageHelper(message, true, "UTF-8");
    }

    //보내는 사람 이메일
    public void setFrom(String fromAddress) throws MessagingException {
        messageHelper.setFrom(fromAddress);
        System.out.println("fromAddress : " + fromAddress);
    }

    // 받는 사람 이메일
    public void setTo(String email) throws MessagingException {
        messageHelper.setTo(email);
        System.out.println("send email to : " + email);
    }

    // 제목
    public void setSubject(String subject) throws MessagingException {
        messageHelper.setSubject(subject);
        System.out.println("subject( title ) : " + subject);
    }

    // 메일 내용
    // 첫번째 파라미터는 htmlContent로 바꾸는게 어떨까?
    public void setText(String text, boolean useHtml) throws MessagingException {
        messageHelper.setText(text, useHtml);
        System.out.println("text : " + text);
    }

    // 발송 
    public void send() {
        try {
            sender.send(message);
            System.out.println("Sender sended Message");
        } catch (Exception e) {
            // TODO Exception 처리
            e.printStackTrace();
        }

    }
}
