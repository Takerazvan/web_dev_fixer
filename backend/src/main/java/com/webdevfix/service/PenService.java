package com.webdevfix.service;

import com.nimbusds.jose.shaded.gson.Gson;
import com.webdevfix.aws.AwsPenComponentService;
import com.webdevfix.aws.EnhancedS3Service;
import com.webdevfix.dto.PenDto;
import com.webdevfix.model.PenComponent;
import com.webdevfix.repository.PenRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
public class PenService {

    private final PenRepository penRepository;
    private final EnhancedS3Service awsPenComponentService;

    @Autowired
    public PenService(PenRepository penRepository, EnhancedS3Service awsPenComponentService) {
        this.penRepository = penRepository;
        this.awsPenComponentService = awsPenComponentService;
    }


    public PenComponent createPen(PenComponent pen) {
        return penRepository.save(pen);
    }

    public List<PenDto> getPensByUserId(Long id) {
        Gson gson = new Gson();

        return penRepository.findAll().stream()
                .filter(pen -> Objects.equals(pen.getUser().getId(), id))
                .map(pen -> {
                    PenDto penDto = new PenDto();

                    try {
                        String jsonString = awsPenComponentService.getEnhancedObject(pen.getObjectKey(), String.class);
                        PenComponent fetchedPen = gson.fromJson(jsonString, PenComponent.class);

                        penDto.setId(pen.getId());
                        penDto.setTitle(pen.getTitle());
                        penDto.setHtml(fetchedPen.getHtml());
                        penDto.setCss(fetchedPen.getCss());
                        penDto.setJs(fetchedPen.getJs());
                        penDto.setUserId(pen.getUser().getId());
                        penDto.setOwnerName(pen.getUser().getLast_name());
                        penDto.setObjectKey(pen.getObjectKey());

                    } catch (IOException e) {
                        e.printStackTrace();
                        throw new RuntimeException(e);
                    }

                    return penDto;
                })
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
        System.out.println("reading all pens");
        for(PenComponent penComponent: penComponents) {
            System.out.println("reading pen"+penComponent.getId());
            try {
                Object result = awsPenComponentService.getEnhancedObject(penComponent.getObjectKey(),Object.class);
                System.out.println("ressult=" + result);


                PenDto penDto = convertToDto(penComponent,result);

                penDtos.add(penDto);
                System.out.println("added pen"+ penDto.getId());
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }

        }
        return penDtos;
    }

    public PenDto convertToDto(PenComponent penComponent, Object result){
        Gson g = new Gson();


        String jsonString= (String) result;
        PenComponent s = g.fromJson(jsonString, PenComponent.class);
        PenDto penDto = new PenDto();
        penDto.setId(penComponent.getId());
        penDto.setTitle(penComponent.getTitle());
        penDto.setJs(s.getJs());
        penDto.setHtml(s.getHtml());
        penDto.setCss(s.getCss());
        penDto.setUserId(penComponent.getUser().getId());
        penDto.setOwnerName(penComponent.getUser().getFirst_name());
        penDto.setObjectKey(penComponent.getObjectKey());
        return penDto;
    }

}
