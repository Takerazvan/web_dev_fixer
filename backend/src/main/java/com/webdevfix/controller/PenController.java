package com.webdevfix.controller;

import com.webdevfix.model.PenComponent;
import com.webdevfix.service.PenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pens")
public class PenController {

    @Autowired
    private PenService penService;

    @PostMapping
    public PenComponent createPen(@RequestBody PenComponent penComponent) {
        return penService.createPen(penComponent);
    }


    @GetMapping("/{id}")
    public List<PenComponent> getPen(@PathVariable("id") Long id) {
        return penService.getPensByUserId(Math.toIntExact(id));
    }

    @GetMapping
    public List<PenComponent> getAllPens() {
        return penService.getAllPens();
    }

    @PutMapping("/{id}")
    public PenComponent updatePen(@PathVariable Long id, @RequestBody PenComponent penComponent) {
        return penService.updatePen(id, penComponent);
    }

    @DeleteMapping("/{id}")
    public void deletePen(@PathVariable Long id) {
        penService.deletePen(id);
    }
}
