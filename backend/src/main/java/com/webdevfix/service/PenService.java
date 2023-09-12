package com.webdevfix.service;

import com.webdevfix.model.PenComponent;
import com.webdevfix.repository.PenRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PenService {
    @Autowired
    private PenRepository penRepository;

    public PenComponent createPen(PenComponent pen) {
        return penRepository.save(pen);
    }

    public PenComponent getPenById(Long id) {
        return penRepository.findById(id).orElse(null);

    }

    public List<PenComponent> getAllPens() {
        return penRepository.findAll();
    }
    public PenComponent updatePen(Long id, PenComponent pen) {
        return penRepository.findById(id)
                .map(existingPen -> {
                    BeanUtils.copyProperties(pen, existingPen, "id");
                    return penRepository.save(existingPen);
                })
                .orElse(null);
    }

    public void deletePen(Long id) {
        penRepository.deleteById(id);
    }
}
