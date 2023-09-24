package com.webdevfix.repository;

import com.webdevfix.model.Role;
import com.webdevfix.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);


    @Query("SELECT u FROM User u WHERE u.role = 'USER'")
    List<User> findByRole(Role role);
}
