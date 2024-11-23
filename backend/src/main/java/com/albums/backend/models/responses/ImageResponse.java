package com.albums.backend.models.responses;

import lombok.Data;

@Data
public class ImageResponse {
    private Long id;
    private String imageTitle;
    private String imageUrl;
}
