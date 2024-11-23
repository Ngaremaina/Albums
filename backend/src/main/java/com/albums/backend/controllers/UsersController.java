package com.albums.backend.controllers;

import com.albums.backend.models.requests.LoginRequest;
import com.albums.backend.models.requests.RegisterRequest;
import com.albums.backend.models.responses.LoginResponse;
import com.albums.backend.models.responses.UserDetailsResponse;
import com.albums.backend.models.responses.UserResponse;
import com.albums.backend.services.UsersService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> createUser(@RequestBody RegisterRequest registerRequest){
        UserResponse userResponse = usersService.addUser(registerRequest);
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginRequest loginRequest){
        LoginResponse loginResponse = usersService.loginUser(loginRequest);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDetailsResponse> fetchUser(@PathVariable String username){
        UserDetailsResponse userDetailsResponse = usersService.getUser(username);
        return new ResponseEntity<>(userDetailsResponse, HttpStatus.OK);
    }

}
