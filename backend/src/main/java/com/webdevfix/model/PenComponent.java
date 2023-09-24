package com.webdevfix.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "pen_components", schema = "public")
public class PenComponent {



    @Id
    @GeneratedValue
    private Long id;
    private String title;

    @Column(length = 90000)
    private String js;

    @Column(length = 90000)
    private String html;

    @Column(length = 90000)
    private String css;



    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User userId;
}
