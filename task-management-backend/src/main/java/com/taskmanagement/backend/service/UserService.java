package com.taskmanagement.backend.service;

import com.taskmanagement.backend.dto.UserRequestDTO;
import com.taskmanagement.backend.dto.UserResponseDTO;

import java.util.List;

public interface UserService {

    UserResponseDTO registerUser(UserRequestDTO dto);

    UserResponseDTO getUserById(Long id);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getUserByEmail(String email);
}