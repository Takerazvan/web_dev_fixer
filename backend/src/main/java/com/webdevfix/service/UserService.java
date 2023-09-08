    package com.webdevfix.service;

    import com.sun.jdi.request.DuplicateRequestException;
    import com.webdevfix.auth.RegisterRequest;
    import com.webdevfix.model.PenComponent;
    import com.webdevfix.model.Role;
    import com.webdevfix.model.User;
    import com.webdevfix.repository.UserRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Service;

    import java.util.List;
    import java.util.NoSuchElementException;

    @Service
    public class UserService {

        private final UserRepository userRepository;
        private final PenService penComponentService;
        private final PasswordEncoder passwordEncoder;

        @Autowired
        public UserService(UserRepository userRepository, PenService penComponentService, PasswordEncoder passwordEncoder) {
            this.userRepository = userRepository;
            this.penComponentService = penComponentService;
            this.passwordEncoder = passwordEncoder;
        }

        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        public User createUser(User user) {
            return userRepository.save(user);
        }

        public User getUserById(int id) {
            return userRepository.findById(id)
                    .orElseThrow(() -> new NoSuchElementException("No user found with id: " + id));
        }

        public User updateUser(int id, User user) {
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

        public void deleteUser(int id) {
            userRepository.deleteById(id);
        }

        public void addPenComponentToUser(int userId, String title, String js, String html, String css) {
            User user = getUserById(userId);
            PenComponent penComponent = PenComponent.builder()
                    .title(title)
                    .js(js)
                    .html(html)
                    .css(css)
                    .userId(user)
                    .build();
          user.getPenComponents().add(penComponent);
            userRepository.save(user);
            System.out.println(user);
            penComponentService.createPen(penComponent);
        }


        public List<PenComponent> getUserPenComponents(int userId) {
            return getUserById(userId).getPenComponents();
        }
//        public User addUser(RegisterRequest registrationRequest) {
//            String email = registrationRequest.email();
//            if (userRepository.existsByEmail(email)) {
//                throw new DuplicateRequestException("email already taken");
//            }
//
//            User appUser = User.builder().first_name(registrationRequest.firstName()).last_name(registrationRequest.lastName()).email(registrationRequest.email()).password(passwordEncoder.encode(registrationRequest.password())).build();
//            userRepository.save(appUser);
//
//
//            return appUser;
//        }
    }
