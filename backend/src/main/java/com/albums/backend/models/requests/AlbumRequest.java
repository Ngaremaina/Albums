package com.albums.backend.models.requests;

import lombok.Data;

@Data
public class AlbumRequest {
    private String albumTitle;
    private String imageUrl;
    private Long userId;
}
