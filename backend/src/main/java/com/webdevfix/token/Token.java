package com.webdevfix.token;


import com.webdevfix.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "token", schema = "public")
public class Token {
    @SequenceGenerator(name = "token_sequence", sequenceName = "token_seq", allocationSize = 1)
    @Id
    @GeneratedValue( strategy =  GenerationType.SEQUENCE,generator = "token_sequence")
    private Integer id;

    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    private boolean expired, revoked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;
}
