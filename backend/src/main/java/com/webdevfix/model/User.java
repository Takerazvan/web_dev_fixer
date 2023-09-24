package com.webdevfix.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.webdevfix.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", schema = "public")
public class User implements UserDetails {

    @SequenceGenerator(name = "user_sequence", sequenceName = "user_seq", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private Integer id;

    private String first_name, last_name, email, password;
    @Column(name = "is_verified", nullable = false)
    private boolean isVerified;

    @Enumerated
    private Role role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private List<PenComponent> penComponents=new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "user" )
    private List<Token> tokens=new ArrayList<>();



    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
