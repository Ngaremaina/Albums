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

        // Update the image title only if it's valid
        if (imageRequest.getImageTitle() != null && !imageRequest.getImageTitle().isBlank()) {
            existingImage.setImageTitle(imageRequest.getImageTitle());
        } else {
            throw new IllegalArgumentException("Image title cannot be null or blank");
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

    public ImageResponse getImageById(Long id){
        Optional<Images> image = imageRepository.findById(id);
        if (image.isPresent()){
            Images getImage = image.get();
            return convertImageResponse(getImage);
        }
        else{
            throw new RuntimeException("Could not find image");
        }

    }



    private ImageResponse convertImageResponse(Images newImage) {
        ImageResponse imageResponse = new ImageResponse();


        imageResponse.setId(newImage.getId());
        imageResponse.setImageTitle(newImage.getImageTitle());
        imageResponse.setImageUrl(newImage.getImageUrl());
        imageResponse.setAlbumId(newImage.getAlbums().getId());


        return imageResponse;

    }
}
