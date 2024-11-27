package com.albums.backend.services;

import com.albums.backend.entities.Users;
import com.albums.backend.exceptions.UserAlreadyExistsException;
import com.albums.backend.models.requests.LoginRequest;
import com.albums.backend.models.requests.RegisterRequest;
import com.albums.backend.models.responses.AlbumResponse;
import com.albums.backend.models.responses.LoginResponse;
import com.albums.backend.models.responses.UserDetailsResponse;
import com.albums.backend.models.responses.UserResponse;
import com.albums.backend.repositories.UserRepository;
import com.albums.backend.security.JwtTokenUtil;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsersService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AlbumService albumService;

    @Transactional
    public UserResponse addUser(RegisterRequest registerRequest){
        Users user = userRepository.findByEmailAddress(registerRequest.getEmailAddress());

        if (user == null){
            Users newUser = new Users();

            newUser.setName(registerRequest.getName());
            newUser.setEmailAddress(registerRequest.getEmailAddress());
            newUser.setUsername(registerRequest.getUsername());
            newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

            userRepository.save(newUser);

            return convertUserResponse(newUser);
        }
        throw new UserAlreadyExistsException("User already exist");

    }

    @Transactional
    public LoginResponse loginUser(LoginRequest loginRequest){
        Users user = userRepository.findByEmailAddress(loginRequest.getEmailAddress());

        if (user == null) {
            throw new RuntimeException("User not found with email: " + loginRequest.getEmailAddress());
        }

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), loginRequest.getPassword()));
        }
        catch (AuthenticationException authenticationException){
            throw new RuntimeException("Incorrect Username and password", authenticationException);
        }

        final String token = jwtTokenUtil.generateToken(user);

        return convertLoginResponse(user, token);

    }

    private LoginResponse convertLoginResponse(Users user, String token) {
        LoginResponse loginResponse = new LoginResponse();

        loginResponse.setUserResponse(convertUserResponse(user));
        loginResponse.setToken(token);

        return loginResponse;
    }


    private UserResponse convertUserResponse(Users newUser) {
        UserResponse userResponse = new UserResponse();

        userResponse.setId(newUser.getId());
        userResponse.setEmailAddress(newUser.getEmailAddress());
        userResponse.setName(newUser.getName());
        userResponse.setUsername(newUser.getUsername());

        return userResponse;
    }

    public UserDetailsResponse getUser(String username){
        Users user = userRepository.findByUsername(username);
        return convertUserDetailsResponse(user);
    }

    public List<UserDetailsResponse> getAllUsers(){
        List<Users> users = userRepository.findAll();
        return users.stream().map(this::convertUserDetailsResponse).toList();
    }

    private UserDetailsResponse convertUserDetailsResponse(Users user) {
        UserDetailsResponse userDetailsResponse = new UserDetailsResponse();

        // Convert the user to a UserResponse
        userDetailsResponse.setUserResponse(convertUserResponse(user));

        // Fetch and set the albums attached to the user
        List<AlbumResponse> userAlbums = albumService.getAlbumsByUserId(user.getId());
        userDetailsResponse.setAlbumResponseList(userAlbums);

        return userDetailsResponse;
    }


    @Override
    public UserDetails loadUserByUsername(String username) {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }
}
