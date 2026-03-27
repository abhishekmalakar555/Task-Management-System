package com.taskmanagement.backend.repository;

import com.taskmanagement.backend.entity.Task;
import com.taskmanagement.backend.entity.enums.Priority;
import com.taskmanagement.backend.entity.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByPriority(Priority priority);
    List<Task> findByAssignedUserIdOrAssignedUserIsNull(Long userId);
}