package com.webdevfix.auth;


import com.webdevfix.dto.AuthenticationResponseDTO;
import com.webdevfix.dto.RegisterRequestDTO;
import com.webdevfix.exceptions.CustomException;

import com.webdevfix.service.LogoutService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class AuthenticationController {

    private final AuthenticationService service;
    private final LogoutService logoutService;
//    private final AuthenticationMapper mapper;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request ) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (Exception e) {
            throw new CustomException("Registration failed", e);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login( @RequestBody AuthenticationRequest request ) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (Exception e) {
            throw new CustomException("Login failed", e);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication){
        logoutService.logout(request, response, authentication);
        System.out.println("Logout");
        return ResponseEntity.ok("Logged out successfully");
    }
}
