package com.webdevfix.database;

import org.springframework.util.MimeType;

public class ContentFile {
    private String content;
    private  MimeType type;

    public ContentFile(String content, MimeType type) {
        this.content = content;
        this.type = type;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setType(MimeType type) {
        this.type = type;
    }
}
