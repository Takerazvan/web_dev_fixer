    package com.webdevfix.service;

    import com.webdevfix.model.PenComponent;
    import com.webdevfix.model.Role;
    import com.webdevfix.model.User;
    import com.webdevfix.repository.UserRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Service;

    import java.util.List;
    import java.util.NoSuchElementException;
    import java.util.stream.Collectors;

    @Service
    public class UserService {

        private final UserRepository userRepository;
        private final PenService penComponentService;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        @Autowired
        public UserService(UserRepository userRepository, PenService penComponentService, PasswordEncoder passwordEncoder, JwtService jwtService) {
            this.userRepository = userRepository;
            this.penComponentService = penComponentService;
            this.passwordEncoder = passwordEncoder;
            this.jwtService = jwtService;

        }

        public List<User> getAllUsers() {
            return userRepository.findAll().stream()
                    .filter(user -> user.getRole() == Role.USER)
                    .collect(Collectors.toList());
        }


        public User createUser(User user) {
            return userRepository.save(user);
        }

        public User getUserById(Long id) {
            return userRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("No user found with id: " + id));
        }


        public User updateUser(long id, User user) {
            return userRepository.findById(id)
                    .map(existingUser -> {
                        existingUser.setFirst_name(user.getFirst_name());
                        existingUser.setLast_name(user.getLast_name());
                        existingUser.setEmail(user.getEmail());
                        existingUser.setPassword(user.getPassword());

                        return userRepository.save(existingUser);
                    })
                    .orElseThrow(() -> new NoSuchElementException("No user found with id: " + id));
        }

        public void deleteUser(long id) {
            userRepository.deleteById(id);
        }

        public void addPenComponentToUser(long userId, String title, String js, String html, String css) {
            User user = getUserById(userId);
            PenComponent penComponent = PenComponent.builder()
                    .title(title)
                    .js(js)
                    .html(html)
                    .css(css)
                    .user(user)
                    .build();
          user.getPenComponents().add(penComponent);
            userRepository.save(user);
            System.out.println(user);
            penComponentService.createPen(penComponent);
        }


        public List<PenComponent> getUserPenComponents(long userId) {
            return getUserById(userId).getPenComponents();
        }


        public void changePassword(String token, String newPassword) {
            String email = jwtService.getSubject(token);
            email = email.replace("\"", "").trim();
            String encodedPassword = passwordEncoder.encode(newPassword);

            String finalEmail = email;
            User appUser = userRepository.findByEmail(email)
                    .orElseThrow(() -> new NoSuchElementException("No user found with email: " + finalEmail));
            System.out.println("HERE"+ appUser.getPassword());
            appUser.setPassword(encodedPassword);
            userRepository.save(appUser);
        }



    }
