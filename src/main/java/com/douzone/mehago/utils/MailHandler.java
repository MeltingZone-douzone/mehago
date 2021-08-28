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
    public MailHandler(JavaMailSender jSender) throws
            MessagingException {
        this.sender = jSender;
        message = jSender.createMimeMessage();
        messageHelper = new MimeMessageHelper(message, true, "UTF-8");
    }

    // 보내는 사람 이메일
    public void setFrom(String fromAddress) throws MessagingException {
        messageHelper.setFrom(fromAddress);
        System.out.println(fromAddress + " fromAddress");
    }

    // 받는 사람 이메일
    public void setTo(String email) throws MessagingException {
        messageHelper.setTo(email);
        System.out.println(email + " email");
    }

    // 제목
    public void setSubject() throws MessagingException {
        messageHelper.setSubject("[MEHAGO] 임시 비밀번호입니다.");
    }

    // 메일 내용
    public void setText(String name, String rendomPassword, boolean useHtml) throws MessagingException {
        
        String htmlContent = "";
        htmlContent += "<img src='https://mblogthumb-phinf.pstatic.net/MjAyMDA4MTRfMTIy/MDAxNTk3MzY4ODE4MDk4.oyQ5wNzuUpDdP860lRZPQ30T18noXnvyvd1x4evvtiwg.h5oh8yhqaF4YyaoM5DQkt1c4TMhsjpITOcO7eLfp210g.JPEG.designpress2016/%EB%A3%A8%ED%94%BC_1.jpg?type=w800' height='24' alt='MEHAGO' />";
        htmlContent += "<h2 style='font-size: 200%' ><strong>[MEHAGO]</strong> "+ name + "님</h2>";
        htmlContent += "<h2 style='font-size: 150%' >임시 비밀번호 안내메일입니다.</h2><br /><br />";
        htmlContent += "<h3 align='center'>안녕하세요 " + name + "회원님</h3>";
        htmlContent += "<h3 align='center'>[MEHAGO]에 요청하신 임시 비밀번호를 보내드립니다.</h3>";
        htmlContent += "<h3 align='center'>아래의 비밀번호로 로그인하셔서 비밀번호를 설정하시기 바랍니다.</h3><br />";
        htmlContent += "<div align='center' style='border:1px solid black; font-family:verdana'>";
        htmlContent +=  "<h3 style='color: blue;'>임시 비밀번호</h3>";
        htmlContent += "<div style='font-size: 130%'>";
        htmlContent += "<p>" + rendomPassword +"<p>";

        messageHelper.setText(htmlContent, useHtml);
        System.out.println(htmlContent + " text");
    }

    // 발송
    public void send() {
        try {
            sender.send(message);
            System.out.println("sender.send(message)");
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
}