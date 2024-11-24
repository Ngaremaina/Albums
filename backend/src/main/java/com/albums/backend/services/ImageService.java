package com.albums.backend.services;

import com.albums.backend.entities.Albums;
import com.albums.backend.entities.Images;
import com.albums.backend.models.requests.ImageRequest;
import com.albums.backend.models.responses.ImageResponse;
import com.albums.backend.repositories.AlbumRepository;
import com.albums.backend.repositories.ImageRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Transactional
    public ImageResponse addImage(ImageRequest imageRequest){
        Images image = imageRepository.findByImageTitle(imageRequest.getImageTitle());
        Optional<Albums> album = albumRepository.findById(imageRequest.getAlbumId());

        if (image == null && album.isPresent()){
            Images newImage = new Images();

            newImage.setImageTitle(imageRequest.getImageTitle());
            newImage.setImageUrl(imageRequest.getImageUrl());
            newImage.setAlbums(album.get());

            imageRepository.save(newImage);

            return convertImageResponse(newImage);
        }
        throw new RuntimeException("Could not add image");
    }

    public List<ImageResponse> getImages(){
        List<Images> imageList = imageRepository.findAll();
        return imageList.stream().map(this::convertImageResponse).toList();
    }

    @Transactional
    public ImageResponse editImage(Long id, ImageRequest imageRequest) {
        // Find the image by ID
        Optional<Images> optionalImage = imageRepository.findById(id);

        // If image is not found, throw an exception
        if (optionalImage.isEmpty()) {
            throw new RuntimeException("Image with ID " + id + " not found");
        }

        Images existingImage = optionalImage.get();

        // Update fields only if provided in the request
        if (imageRequest.getImageTitle() != null) {
            existingImage.setImageTitle(imageRequest.getImageTitle());
        }

        if (imageRequest.getImageUrl() != null) {
            existingImage.setImageUrl(imageRequest.getImageUrl());
        }

        if (imageRequest.getAlbumId() != null) {
            // Fetch the album entity from the repository
            Optional<Albums> optionalAlbum = albumRepository.findById(imageRequest.getAlbumId());
            if (optionalAlbum.isEmpty()) {
                throw new RuntimeException("Album with ID " + imageRequest.getAlbumId() + " not found");
            }
            existingImage.setAlbums(optionalAlbum.get());
        }

        // Save the updated image entity
        Images updatedImage = imageRepository.save(existingImage);

        // Convert to response DTO
        return convertImageResponse(updatedImage);
    }

    public List<ImageResponse> getImagesByAlbumId(Long albumId) {
        List<Images> images = imageRepository.findByAlbumsId(albumId);
        return images.stream()
                .map(this::convertImageResponse)
                .toList();
    }



    private ImageResponse convertImageResponse(Images newImage) {
        ImageResponse imageResponse = new ImageResponse();

        imageResponse.setId(newImage.getId());
        imageResponse.setImageTitle(newImage.getImageTitle());
        imageResponse.setImageUrl(newImage.getImageUrl());


        return imageResponse;

    }
}
