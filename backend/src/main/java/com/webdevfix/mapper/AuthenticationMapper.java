package com.webdevfix.mapper;

import com.webdevfix.auth.AuthenticationResponse;
import com.webdevfix.auth.RegisterRequest;
import com.webdevfix.dto.AuthenticationResponseDTO;
import com.webdevfix.dto.RegisterRequestDTO;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationMapper {

    public RegisterRequest mapToRegisterRequest(RegisterRequestDTO registerRequestDTO) {
        return new RegisterRequest(
                registerRequestDTO.getFirst_name(),
                registerRequestDTO.getLast_name(),
                registerRequestDTO.getEmail(),
                registerRequestDTO.getPassword());
    }

//    public AuthenticationResponseDTO mapToAuthenticationResponseDTO(AuthenticationResponse response) {
//        return new AuthenticationResponseDTO(
//                response.getToken(),
//                response.getRefreshToken(),response.);
//    }
}