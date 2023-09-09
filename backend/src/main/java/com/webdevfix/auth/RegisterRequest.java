package com.webdevfix.auth;

import com.webdevfix.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public record RegisterRequest(
        String first_name,
        String last_name,
        String email,
        String password

) {


}