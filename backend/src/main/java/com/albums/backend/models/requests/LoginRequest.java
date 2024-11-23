package com.albums.backend.models.requests;

import lombok.Data;

@Data
public class LoginRequest {
    private String emailAddress;
    private String password;
}
