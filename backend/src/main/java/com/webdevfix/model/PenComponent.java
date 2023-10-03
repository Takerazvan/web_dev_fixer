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

    @Transient
    private String js;

    @Transient
    private String html;


    @Transient
    private String css;

    @Column(name="object_key")
    private  String objectKey;

//    @Column(name="object_key")
//    private String objectKey;


//  TODO SAVE TO PRIVATE BUCKET S3


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;


}
