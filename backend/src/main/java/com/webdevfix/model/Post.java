package com.webdevfix.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;



@Getter
@Setter
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;

  @Enumerated(EnumType.STRING)
    private PostCategory category;

    @ManyToOne(fetch=FetchType.EAGER)
    private User userId;

}