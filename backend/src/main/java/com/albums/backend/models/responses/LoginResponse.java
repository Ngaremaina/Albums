package com.albums.backend.models.responses;

import lombok.Data;

@Data
public class LoginResponse {
    private UserResponse userResponse;
    private String token;
}
