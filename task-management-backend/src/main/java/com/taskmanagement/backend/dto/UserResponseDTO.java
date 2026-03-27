package com.taskmanagement.backend.dto;

import com.taskmanagement.backend.entity.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {

    private Long id;
    private String name;
    private String email;
    private Role role;
}