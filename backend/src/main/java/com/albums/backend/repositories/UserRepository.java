package com.albums.backend.repositories;

import com.albums.backend.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmailAddress(String emailAddress);
    Users findByUsername(String username);
}
