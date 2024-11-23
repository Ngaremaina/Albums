package com.albums.backend.models.responses;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String emailAddress;
    private String username;
}
