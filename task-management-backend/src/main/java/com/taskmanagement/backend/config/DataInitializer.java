package com.taskmanagement.backend.config;

import com.taskmanagement.backend.entity.User;
import com.taskmanagement.backend.entity.Task;
import com.taskmanagement.backend.entity.enums.Role;
import com.taskmanagement.backend.entity.enums.TaskStatus;
import com.taskmanagement.backend.entity.enums.Priority;
import com.taskmanagement.backend.repository.UserRepository;
import com.taskmanagement.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // Only seed if no users exist yet
        if (userRepository.count() > 0) return;

        // Create Admin user
        // Email: admin@example.com | Password: admin123
        User admin = User.builder()
                .name("Admin")
                .email("admin@example.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .createdAt(LocalDateTime.now())
                .build();

        // Create normal User
        // Email: user@example.com | Password: user123
        User user = User.builder()
                .name("John Doe")
                .email("user@example.com")
                .password(passwordEncoder.encode("user123"))
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(admin);
        userRepository.save(user);

        // Create sample tasks
        taskRepository.save(Task.builder()
                .title("Setup project")
                .description("Initial project setup and configuration")
                .status(TaskStatus.COMPLETED)
                .priority(Priority.HIGH)
                .dueDate(LocalDate.of(2025, 1, 10))
                .assignedUser(user)
                .createdAt(LocalDateTime.now())
                .build());

        taskRepository.save(Task.builder()
                .title("Build login page")
                .description("Create login and register UI")
                .status(TaskStatus.IN_PROGRESS)
                .priority(Priority.MEDIUM)
                .dueDate(LocalDate.of(2025, 2, 15))
                .assignedUser(user)
                .createdAt(LocalDateTime.now())
                .build());

        taskRepository.save(Task.builder()
                .title("Write documentation")
                .description("Document all APIs and features")
                .status(TaskStatus.PENDING)
                .priority(Priority.LOW)
                .dueDate(LocalDate.of(2025, 3, 1))
                .assignedUser(null)
                .createdAt(LocalDateTime.now())
                .build());

        System.out.println("Seed data inserted successfully.");
    }
}