package com.webdevfix.auth;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.webdevfix.exceptions.CustomException;
import com.webdevfix.model.Role;
import com.webdevfix.model.User;
import com.webdevfix.notifications.EmailService;
import com.webdevfix.notifications.EmailValidator;
import com.webdevfix.repository.TokenRepository;
import com.webdevfix.repository.UserRepository;
import com.webdevfix.service.JwtService;
import com.webdevfix.service.UserService;
import com.webdevfix.token.Token;
import com.webdevfix.token.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;;
    public AuthenticationResponse register(RegisterRequest request) {


        if (userRepository.existsByEmail(request.email())) {
            throw new CustomException("User already registered", null, HttpStatus.BAD_REQUEST);

        }
        if (!EmailValidator.isEmailValid(request.email())) {
            throw new CustomException("Invalid email address", null, HttpStatus.BAD_REQUEST);
        }

        String hashedPassword = passwordEncoder.encode(request.password());
        var user = User.builder()
                .first_name(request.first_name())
                .last_name(request.last_name())
                .email(request.email())
                .password(hashedPassword)
                .role(Role.USER)
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var verificationLink= "http://localhost:9090/verify?token=" + jwtToken;
        emailService.send(savedUser.getEmail(), verificationLink);

        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws CustomException {
        if (!userRepository.existsByEmail(request.email())) {
            throw new CustomException("You dont have an account", null, HttpStatus.BAD_REQUEST);

        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password()
                    )
            );
        } catch (Exception e) {
            throw new CustomException("User or password incorrect ",null,HttpStatus.UNAUTHORIZED);
        }
        var user = userRepository.findByEmail(request.email())
                .orElseThrow();
        revokeAllUserTokens(Optional.of(user));
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

            System.out.println(user.isAccountNonLocked());
//if (!user.isEnabled()){
//    throw new IllegalStateException("Email not verified");
//}
        saveUserToken(user, jwtToken);
           return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken).userId((long) user.getId())
                .build();
    }

    private void revokeAllUserTokens(Optional<User> user) {

        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.get().getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(Optional.of(user));
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .token(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
//    public boolean verifyEmail(String token) {
//        String email = jwtService.extractUsername(token);
//
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            user.setEnabled(true);
//            userRepository.save(user);
//
//            return true;
//        }
//
//        return false;
//    }
}
