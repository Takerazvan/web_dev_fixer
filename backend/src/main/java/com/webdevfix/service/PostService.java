package com.webdevfix.service;

import com.webdevfix.model.Post;
import com.webdevfix.model.Postform;
import com.webdevfix.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PostService {
    private final PostRepository postRepository;

        @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long postId) {
        return (Post) postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
    }





    public void deletePost(Long postId) {

        postRepository.deleteById(postId);
    }

    public void addPost(Post post) {
        postRepository.save(post);
    }
}