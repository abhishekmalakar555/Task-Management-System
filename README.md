# Task Management System

A full-stack Task Management application built with Spring Boot, React and MySQL featuring role-based access control, JWT authentication, and a fully containerized Docker setup.

---

## Tech Stack

### Backend
- Java 17
- Spring Boot 4
- Spring Security (JWT-based authentication)
- Spring Data JPA (Hibernate)
- MySQL 8
- Maven

### Frontend
- React (Create React App)
- Axios
- React Router DOM
- Bootstrap

### DevOps
- Docker
- Docker Compose
- GitHub Actions (CI)

---

## Features

### Authentication
- User registration and login
- JWT token-based authentication
- Passwords encrypted using BCrypt

### Admin Mode
- View all tasks in the system
- Create new tasks and assign them to users
- Edit any task (title, description, status, priority, due date, assigned user)
- Delete any task

### User Mode
- View only tasks assigned to them and unassigned tasks
- Update the status of tasks assigned to them (PENDING / IN_PROGRESS / COMPLETED)
- Cannot edit or delete tasks

### General
- Filter tasks by status (PENDING, IN_PROGRESS, COMPLETED)
- RESTful API backend
- Fully containerized with Docker

---

## Project Structure
```
Capstone project/
│
├── task-management-backend/       # Spring Boot application
│   ├── src/
│   │   └── main/java/com/taskmanagement/backend/
│   │       ├── config/            # Security config, Data initializer
│   │       ├── controller/        # REST controllers
│   │       ├── dto/               # Request and Response DTOs
│   │       ├── entity/            # JPA entities (Task, User)
│   │       ├── repository/        # Spring Data JPA repositories
│   │       ├── security/          # JWT filter and utility
│   │       └── service/           # Service interfaces and implementations
│   ├── Dockerfile
│   └── pom.xml
│
├── task-management-frontend/      # React application
│   ├── src/
│   │   ├── components/            # Navbar and shared components
│   │   ├── pages/                 # Login, Register, Dashboard, EditTask
│   │   └── services/              # Axios API calls
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

---

## Default Login Credentials

These are automatically seeded when the application starts for the first time:

| Role  | Email                 | Password  |
|-------|-----------------------|-----------|
| Admin | admin@example.com     | admin123  |
| User  | user@example.com      | user123   |

---

## How to Run with Docker

### Prerequisites
- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed
- [Maven](https://maven.apache.org/) installed

### Steps

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
```

**2. Build the backend JAR:**
```bash
cd task-management-backend
mvn clean package -DskipTests
cd ..
```

**3. Build and start all containers:**
```bash
docker-compose up --build
```

**4. Open the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

---

## Useful Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up --build` | Build images and start all containers |
| `docker-compose up` | Start containers without rebuilding |
| `docker-compose down` | Stop and remove containers |
| `docker-compose down -v` | Stop containers and wipe all data |
| `docker ps` | List running containers |
| `docker-compose logs -f` | Follow live logs of all containers |

---

## API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /auth/register | Register a new user | Public |
| POST | /auth/login | Login and receive JWT token | Public |

### Tasks
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /tasks | Get tasks (all for ADMIN, filtered for USER) | Authenticated |
| POST | /tasks | Create a new task | ADMIN only |
| PUT | /tasks/{id} | Update a task | ADMIN only |
| DELETE | /tasks/{id} | Delete a task | ADMIN only |
| PATCH | /tasks/{id}/status | Update task status | USER (own tasks only) |
| GET | /tasks/{id} | Get task by ID | Authenticated |
| GET | /tasks/status/{status} | Filter tasks by status | Authenticated |
| GET | /tasks/priority/{priority} | Filter tasks by priority | Authenticated |

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /users | Get all users | ADMIN only |

---

## CI/CD

GitHub Actions is configured to automatically trigger on every push or pull request to the `main` branch. The pipeline:
- Builds the Spring Boot backend using Maven
- Builds the React frontend using Node
- Builds both Docker images to verify containerization

See `.github/workflows/ci.yml` for the full configuration.

---

## Notes
- The MySQL database is persisted in a Docker volume (`mysql_data`), so data survives container restarts
- Running `docker-compose down -v` will wipe the database and reseed it on next startup
- The application uses port `3000` for frontend, `8080` for backend, and `3307` for MySQL (to avoid conflict with any local MySQL on port 3306)