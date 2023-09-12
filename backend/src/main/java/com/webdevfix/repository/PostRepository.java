package com.webdevfix.repository;

import com.webdevfix.model.Post;
import com.webdevfix.model.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByCategory(PostCategory category);
    Optional<Post> findById(Long postId);


    //TODO Other methods for retrieving, updating, and deleting posts


}
