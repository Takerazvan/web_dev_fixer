package com.webdevfix.notifications;

public interface MessageSender {
    void send(String to, String message);
}