package com.webdevfix.repository;

import com.webdevfix.model.PenComponent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PenRepository extends JpaRepository<PenComponent, Long> {}