package com.taskmanagement.backend.dto;

import com.taskmanagement.backend.entity.enums.Priority;
import com.taskmanagement.backend.entity.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequestDTO {

    @NotBlank
    private String title;

    private String description;

    private TaskStatus status;

    private Priority priority;

    private LocalDate dueDate;

    private Long assignedUserId;
}