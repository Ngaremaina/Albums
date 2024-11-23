package com.albums.backend.models.requests;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String emailAddress;
    private String username;
    private String password;
}
