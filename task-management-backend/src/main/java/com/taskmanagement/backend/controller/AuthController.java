package com.taskmanagement.backend.controller;

import com.taskmanagement.backend.dto.UserRequestDTO;
import com.taskmanagement.backend.dto.UserResponseDTO;
import com.taskmanagement.backend.entity.User;
import com.taskmanagement.backend.repository.UserRepository;
import com.taskmanagement.backend.security.JwtUtil;
import com.taskmanagement.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public UserResponseDTO register(@Valid @RequestBody UserRequestDTO dto) {
        return userService.registerUser(dto);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserRequestDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    }
}