package com.albums.backend.repositories;

import com.albums.backend.entities.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Images, Long> {
    Images findByImageTitle(String imageTitle);
    List<Images> findByAlbumsId(Long albumId);
}
