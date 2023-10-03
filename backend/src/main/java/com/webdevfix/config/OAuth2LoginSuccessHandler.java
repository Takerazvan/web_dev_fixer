package com.webdevfix.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webdevfix.model.User;
import com.webdevfix.repository.UserRepository;
import com.webdevfix.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.net.URLEncoder;
import java.util.Map;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtUtil;
       private final UserRepository userRepository;



    public OAuth2LoginSuccessHandler(JwtService jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;

        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();


        String id = String.valueOf(((Map<?, ?>) attributes).get("id"));

        String name = (String) attributes.get("name");


        User user = userRepository.findByGithubId(id).orElseGet(() -> {
            User newUser = new User();
            newUser.setGithubId(id);
            newUser.setLast_name(name);
            System.out.println(newUser);
            return userRepository.save(newUser);
        });

        String token = jwtUtil.generateTokenOauth(user.getLast_name());
        String userAttributesJson = new ObjectMapper().writeValueAsString(attributes);
        String encodedUserAttributes = URLEncoder.encode(userAttributesJson, "UTF-8");
        String redirectUrl = "http://localhost:3000/oauth2redirect?token=" + token + "&user=" + encodedUserAttributes +  "&userId=" + user.getId();

        response.sendRedirect(redirectUrl);
    }
}
