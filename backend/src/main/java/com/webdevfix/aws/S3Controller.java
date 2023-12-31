package com.webdevfix.aws;

import com.webdevfix.dto.PenDto;
import com.webdevfix.model.PenComponent;
import com.webdevfix.model.User;
import com.webdevfix.service.PenService;
import com.webdevfix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aws-pens")
public class S3Controller {



    private final PenService penService;

    private final UserService userService;
    private final EnhancedS3Service enhancedS3Service;

    @Autowired
    public S3Controller(PenService penService, UserService userService, EnhancedS3Service enhancedS3Service) {

        this.penService = penService;
        this.userService = userService;
        this.enhancedS3Service = enhancedS3Service;
    }

    @PostMapping("/addpentoaws")
    public ResponseEntity<Boolean> addPenToAws(@RequestBody PenRequestForm penRequestForm) {
        String key = enhancedS3Service.uploadWebFiles(penRequestForm);
//        System.out.println("key="+key);
//        System.out.println(penRequestForm);
        PenComponent penComponent = new PenComponent();
        penComponent.setTitle(penRequestForm.title());


        User user = userService.getUserById(penRequestForm.userId());
        penComponent.setUser(user);

        PenComponent penComponentUpdate = penService.createPen(penComponent);


        penComponentUpdate.setObjectKey(key);
        penService.updatePen(penComponentUpdate.getId(), penComponentUpdate);
        return ResponseEntity.ok(true);
    }
    @DeleteMapping("/remove")
    public ResponseEntity<Boolean> deletePenObjects(@RequestParam("objectKey") String objectKey) {

        System.out.println("objectKey="+objectKey);
        System.out.println("DELETED");
            enhancedS3Service.deletePenObjects(objectKey);
            return ResponseEntity.ok(true);

    }


    }
