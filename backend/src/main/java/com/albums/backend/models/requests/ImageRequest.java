package com.albums.backend.models.requests;

import lombok.Data;

@Data
public class ImageRequest {
    private String imageTitle;
    private String imageUrl;
    private Long albumId;
}
