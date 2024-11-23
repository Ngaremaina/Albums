package com.albums.backend.controllers;

import com.albums.backend.models.requests.AlbumRequest;
import com.albums.backend.models.responses.AlbumResponse;
import com.albums.backend.services.AlbumService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/albums")
public class AlbumController {
    @Autowired
    private AlbumService albumService;

    @PostMapping("/add")
    public ResponseEntity<AlbumResponse> createAlbum(@RequestBody AlbumRequest albumRequest){
        AlbumResponse albumResponse = albumService.addAlbum(albumRequest);
        return new ResponseEntity<>(albumResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlbumResponse> fetchAlbum(@PathVariable Long id){
        AlbumResponse albumResponse = albumService.getAlbumById(id);
        return new ResponseEntity<>(albumResponse, HttpStatus.OK);
    }
}
