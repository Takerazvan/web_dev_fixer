package com.webdevfix.repository;

import com.webdevfix.model.PenComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PenRepository extends JpaRepository<PenComponent, Long> {

    @Query("SELECT p FROM PenComponent p WHERE p.user = ?1")
    List<PenComponent> findPensByUserId(@Param("userId") Long userId);
}

