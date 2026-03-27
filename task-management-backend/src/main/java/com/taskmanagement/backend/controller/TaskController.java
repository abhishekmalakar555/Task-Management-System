package com.taskmanagement.backend.controller;

import com.taskmanagement.backend.dto.TaskRequestDTO;
import com.taskmanagement.backend.dto.TaskResponseDTO;
import com.taskmanagement.backend.entity.enums.Priority;
import com.taskmanagement.backend.entity.enums.TaskStatus;
import com.taskmanagement.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponseDTO createTask(@Valid @RequestBody TaskRequestDTO dto) {
        return taskService.createTask(dto);
    }

    @PutMapping("/{id}")
    public TaskResponseDTO updateTask(@PathVariable Long id,
                                      @Valid @RequestBody TaskRequestDTO dto) {
        return taskService.updateTask(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/{id}")
    public TaskResponseDTO getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // UPDATED: returns all tasks for ADMIN, filtered tasks for USER
    @GetMapping
    public List<TaskResponseDTO> getAllTasks(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities()
                .contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (isAdmin) {
            return taskService.getAllTasks();
        } else {
            String email = (String) authentication.getPrincipal();
            return taskService.getTasksForCurrentUser(email);
        }
    }

    @GetMapping("/status/{status}")
    public List<TaskResponseDTO> getTasksByStatus(@PathVariable TaskStatus status) {
        return taskService.getTasksByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    public List<TaskResponseDTO> getTasksByPriority(@PathVariable Priority priority) {
        return taskService.getTasksByPriority(priority);
    }

    @PatchMapping("/{id}/status")
    public TaskResponseDTO updateTaskStatus(@PathVariable Long id,
                                            @RequestParam TaskStatus status,
                                            Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities()
                .contains(new SimpleGrantedAuthority("ROLE_ADMIN"));

        if (!isAdmin) {
            // Verify the task is actually assigned to this user, not unassigned
            TaskResponseDTO task = taskService.getTaskById(id);
            String email = (String) authentication.getPrincipal();

            if (task.getAssignedUserName() == null) {
                throw new RuntimeException("You are not allowed to update status of unassigned tasks");
            }
        }

        return taskService.updateTaskStatus(id, status);
    }
}