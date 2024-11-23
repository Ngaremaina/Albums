package com.albums.backend.controllers;

import com.albums.backend.models.requests.ImageRequest;
import com.albums.backend.models.responses.ImageResponse;
import com.albums.backend.repositories.ImageRepository;
import com.albums.backend.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/images")
public class ImageController {
    @Autowired
    private ImageService imageService;


    @PostMapping("/add")
    public ResponseEntity<ImageResponse> createImage(@RequestBody ImageRequest imageRequest){
        ImageResponse imageResponse = imageService.addImage(imageRequest);
        return new ResponseEntity<>(imageResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImageResponse> editImage(@PathVariable Long id, @RequestBody ImageRequest imageRequest){
        ImageResponse imageResponse = imageService.editImage(id, imageRequest);
        return new ResponseEntity<>(imageResponse, HttpStatus.OK);

    }
}
