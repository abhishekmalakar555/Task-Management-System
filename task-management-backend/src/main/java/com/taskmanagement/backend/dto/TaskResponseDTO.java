package com.taskmanagement.backend.dto;

import com.taskmanagement.backend.entity.enums.Priority;
import com.taskmanagement.backend.entity.enums.TaskStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TaskResponseDTO {

    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private Priority priority;
    private LocalDate dueDate;
    private String assignedUserName;
}