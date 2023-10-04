package com.webdevfix.model;

public enum MimeTypes {
    HTML("text/html"),
    CSS("text/css"),
    JS("application/javascript"),
    JSON("application/json");

    private final String mimeType;

    MimeTypes(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getMimeType() {
        return mimeType;
    }
}
