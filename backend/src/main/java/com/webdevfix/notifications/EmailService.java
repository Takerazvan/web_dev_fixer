package com.webdevfix.notifications;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@AllArgsConstructor
public class EmailService implements MessageSender {

    private final static Logger LOGGER = LogManager.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String verificationLink ) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setFrom("aprozar4us@gmail.com");
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            String message = " Please click the following link to verify your email: " + verificationLink ;
            helper.setText(message, true);


            mailSender.send(mimeMessage);
            System.out.println("Verification email sent!");
        } catch (MessagingException e) {
            LOGGER.error("Failed to send email", e);
            throw new IllegalStateException("Failed to send email");
        }
    }
    @Async
    public void sendPasswordResetEmail(String to, String resetLink, LocalDateTime expirationTime) {

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setFrom("your-email@example.com");
            helper.setTo(to);
            helper.setSubject("Password Reset Request");


            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            String formattedExpirationTime = expirationTime.format(formatter);

            String message = "Click the following link to reset your password: " + resetLink +
                    "<br>Link will expire at: " + formattedExpirationTime;
            helper.setText(message, true);

            mailSender.send(mimeMessage);
            System.out.println("Password reset email sent!");
        } catch (MessagingException e) {
            LOGGER.error("Failed to send email", e);
            throw new IllegalStateException("Failed to send email");
        }
    }
}