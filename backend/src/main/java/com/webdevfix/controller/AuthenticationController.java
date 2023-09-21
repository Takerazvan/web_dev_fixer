    package com.webdevfix.controller;


    import com.webdevfix.auth.AuthenticationRequest;
    import com.webdevfix.auth.AuthenticationResponse;
    import com.webdevfix.auth.AuthenticationService;
    import com.webdevfix.auth.RegisterRequest;

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
        @GetMapping("/loginWithGithub")
        public ResponseEntity<String> loginWithGithub() {
            return ResponseEntity.status(HttpStatus.OK)
                    .body("You have successfully logged in with GitHub!");
        }

        @PostMapping("/logout")
        public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
            logoutService.logout(request, response, authentication);
            System.out.println("Logout");
            return ResponseEntity.ok("Logged out successfully");
        }
    }
