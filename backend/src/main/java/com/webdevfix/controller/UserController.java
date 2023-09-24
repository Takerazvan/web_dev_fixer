package com.webdevfix.controller;

import com.webdevfix.model.PenComponent;
import com.webdevfix.model.User;
import com.webdevfix.service.PenRequest;
import com.webdevfix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PostMapping("/addpen")
    public ResponseEntity<Void> createPen(@RequestBody PenRequest penRequest) {
        userService.addPenComponentToUser(penRequest.userId(), penRequest.title(), penRequest.js(), penRequest.html(), penRequest.css());
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<String> getUserById(@PathVariable Integer id) {
        try {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user.getFirst_name() + " " + user.getLast_name(), HttpStatus.OK);
        } catch (NoSuchElementException exception) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/reset/password")
    public ResponseEntity<Void> updatePassword(@RequestParam String token, @RequestBody String newPassword) {
        System.out.println(newPassword);

        userService.changePassword(token, newPassword);
        return ResponseEntity.noContent().build();

    }
}
