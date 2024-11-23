package com.albums.backend.services;

import com.albums.backend.entities.Albums;
import com.albums.backend.entities.Users;
import com.albums.backend.models.requests.AlbumRequest;
import com.albums.backend.models.responses.AlbumResponse;
import com.albums.backend.models.responses.ImageResponse;
import com.albums.backend.repositories.AlbumRepository;
import com.albums.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    public AlbumResponse addAlbum(AlbumRequest albumRequest) {
        Albums existingAlbum = albumRepository.findByAlbumTitle(albumRequest.getAlbumTitle());
        Optional<Users> user = userRepository.findById(albumRequest.getUserId());

        if (existingAlbum != null) {
            throw new RuntimeException("Album with the given title already exists");
        }

        if (user.isEmpty()) {
            throw new RuntimeException("User with ID " + albumRequest.getUserId() + " not found");
        }

        Albums newAlbum = new Albums();
        newAlbum.setAlbumTitle(albumRequest.getAlbumTitle());
        newAlbum.setUsers(user.get());

        Albums savedAlbum = albumRepository.save(newAlbum);

        return convertAlbumResponse(savedAlbum);
    }


    public List<AlbumResponse> getAlbums(){
        List<Albums> albumsList = albumRepository.findAll();
        return albumsList.stream().map(this::convertAlbumResponse).toList();

    }

    private AlbumResponse convertAlbumResponse(Albums newAlbum) {
        AlbumResponse albumResponse = new AlbumResponse();

        albumResponse.setId(newAlbum.getId());
        albumResponse.setAlbumTitle(newAlbum.getAlbumTitle());

        // Retrieve images associated with the album
        List<ImageResponse> imageResponses = imageService.getImagesByAlbumId(newAlbum.getId());
        albumResponse.setImageResponseList(imageResponses);

        return albumResponse;
    }


    public List<AlbumResponse> getAlbumsByUserId(Long userId) {
        List<Albums> userAlbums = albumRepository.findByUsersId(userId);
        return userAlbums.stream()
                .map(this::convertAlbumResponse)
                .toList();
    }



    public AlbumResponse getAlbumById(Long id) {
        Optional<Albums> albumOptional = albumRepository.findById(id);

        if (albumOptional.isEmpty()) {
            throw new RuntimeException("Album with ID " + id + " not found");
        }

        Albums album = albumOptional.get();

        return convertAlbumResponse(album);
    }


}

