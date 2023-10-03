    package com.webdevfix.controller;


    import com.webdevfix.auth.AuthenticationRequest;
    import com.webdevfix.auth.AuthenticationResponse;
    import com.webdevfix.auth.AuthenticationService;
    import com.webdevfix.auth.RegisterRequest;

    import com.webdevfix.exceptions.CustomException;
    import com.webdevfix.mapper.AuthenticationMapper;
    import com.webdevfix.notifications.EmailService;
    import com.webdevfix.service.LogoutService;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.core.Authentication;

    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.servlet.view.RedirectView;

    import java.time.LocalDateTime;
    import java.time.temporal.ChronoUnit;

    @RestController
    @RequiredArgsConstructor
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/")
    public class AuthenticationController {

        private final AuthenticationService service;
        private final LogoutService logoutService;
        private final AuthenticationMapper mapper;
        private final EmailService emailService;

        @PostMapping("/register")
        public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {

                return ResponseEntity.ok(service.register(request));

        }

        @PostMapping("/login")
        public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {

                return ResponseEntity.ok(service.authenticate(request));

        }
        @GetMapping("/verify")
        public RedirectView verify(@RequestParam("token") String token) {
            boolean emailVerified = service.verifyEmail(token);

            if (emailVerified) {
                // Redirect to the login page
                return new RedirectView("http://localhost:3000/login");
            } else {
                // Redirect to an error page
                return new RedirectView("http://localhost:3000/error");
            }
        }


        @PostMapping("/logout")
        public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
            logoutService.logout(request, response, authentication);
            System.out.println("Logout");
            return ResponseEntity.ok("Logged out successfully");
        }


        @PostMapping("/reset-password")
        public ResponseEntity<?> reset(@RequestBody String email) {

            try {
                // Generate the reset password token with 10 minutes expiration
                String resetToken = service.generateResetPasswordToken(email);

                // Create the reset password link with the generated token

                String resetLink = "http://localhost:9090/reset-pass-form?token=" + resetToken;

                // Send the reset password email
                LocalDateTime expirationTime = LocalDateTime.now().plus(10, ChronoUnit.MINUTES);
                emailService.sendPasswordResetEmail(email, resetLink, expirationTime);

                return ResponseEntity.ok("Email sent");
            } catch (IllegalArgumentException e) {
                // Handle the case where the user does not exist
                throw new CustomException("User does not exist",null, HttpStatus.NOT_FOUND);
            }
        }


        @GetMapping("/reset-pass-form")
        public RedirectView resetForm(@RequestParam("token") String token) {


            boolean isExpired = service.isResetTokenExpired(token);
            if (!isExpired) {
                return new RedirectView("http://localhost:3000/reset-password-form?token=" + token);
            } else {
                return new RedirectView("http://localhost:3000/reset-password");

            }

        }
    }
