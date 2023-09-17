package com.webdevfix.auth;

public record RegisterRequest(
        String first_name,
        String last_name,
        String email,
        String password

) {


}