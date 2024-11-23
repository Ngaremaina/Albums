package com.albums.backend.models.responses;

import lombok.Data;
import java.util.List;

@Data
public class AlbumResponse {
    private Long id;
    private String albumTitle;
    private List<ImageResponse> imageResponseList;

}
