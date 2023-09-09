package com.webdevfix.dto;

    public record AuthenticationResponseDTO(String token, String refreshToken, String email,  String first_name, String last_name) {
}
