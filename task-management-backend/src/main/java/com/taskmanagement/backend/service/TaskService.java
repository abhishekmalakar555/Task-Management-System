package com.taskmanagement.backend.service;

import com.taskmanagement.backend.dto.TaskRequestDTO;
import com.taskmanagement.backend.dto.TaskResponseDTO;
import com.taskmanagement.backend.entity.enums.Priority;
import com.taskmanagement.backend.entity.enums.TaskStatus;

import java.util.List;

public interface TaskService {
    TaskResponseDTO createTask(TaskRequestDTO dto);
    TaskResponseDTO updateTask(Long id, TaskRequestDTO dto);
    void deleteTask(Long id);
    TaskResponseDTO getTaskById(Long id);
    List<TaskResponseDTO> getAllTasks();
    List<TaskResponseDTO> getTasksByStatus(TaskStatus status);
    List<TaskResponseDTO> getTasksByPriority(Priority priority);
    TaskResponseDTO updateTaskStatus(Long id, TaskStatus status);
    List<TaskResponseDTO> getTasksForCurrentUser(String email);
}