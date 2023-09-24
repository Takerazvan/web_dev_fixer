package com.webdevfix.service;

import com.webdevfix.dto.PenDto;
import com.webdevfix.model.PenComponent;
import com.webdevfix.repository.PenRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
public class PenService {
    @Autowired
    private PenRepository penRepository;

    public PenComponent createPen(PenComponent pen) {
        return penRepository.save(pen);
    }

    public List<PenComponent> getPensByUserId(Integer id) {

        return penRepository.findAll().stream()
                .filter(pen -> Objects.equals(pen.getUserId().getId(), id))
                .collect(Collectors.toList());

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

    public List<PenDto> getAllPens() {
        List<PenComponent> penComponents = penRepository.findAll();
        List<PenDto> penDtos = new ArrayList<>();
        for(PenComponent penComponent: penComponents) {
            PenDto penDto = convertToDto(penComponent);
            penDtos.add(penDto);
        }
        return penDtos;
    }

    public PenDto convertToDto(PenComponent penComponent) {
        PenDto penDto = new PenDto();
        penDto.setId(penComponent.getId());
        penDto.setTitle(penComponent.getTitle());
        penDto.setJs(penComponent.getJs());
        penDto.setHtml(penComponent.getHtml());
        penDto.setCss(penComponent.getCss());
        penDto.setUserId(Long.valueOf(penComponent.getUserId().getId()));
        return penDto;
    }

}
