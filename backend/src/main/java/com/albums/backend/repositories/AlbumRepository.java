package com.albums.backend.repositories;

import com.albums.backend.entities.Albums;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Albums, Long> {
    Albums findByAlbumTitle(String albumTitle);
    List<Albums> findByUsersId(Long userId);
}
