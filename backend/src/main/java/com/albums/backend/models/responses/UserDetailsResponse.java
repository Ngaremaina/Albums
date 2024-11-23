package com.albums.backend.models.responses;

import lombok.Data;
import java.util.List;

@Data
public class UserDetailsResponse {
    private UserResponse userResponse;
    private List<AlbumResponse> albumResponseList;
}
