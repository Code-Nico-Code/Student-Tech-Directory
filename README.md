# Student Tech Directory

A full-stack microservices application for managing student tech stack profiles.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐
│  React Frontend │────▶│   API Gateway    │
│   (Port 5173)   │     │   (Port 8080)    │
└─────────────────┘     └────────┬─────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐    ┌───────────────────┐    ┌──────────────────┐
│ Auth Service  │    │ Student Service   │    │ Tech Stack Svc   │
│  (Port 8084)  │    │   (Port 8081)     │    │   (Port 8082)    │
└───────────────┘    └───────────────────┘    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ Enrollment Svc   │
                    │   (Port 8083)    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Eureka Server   │
                    │   (Port 8761)    │
                    └──────────────────┘
```

## Tech Stack

### Backend

- Java 17+
- Spring Boot 3.x
- Spring Cloud Gateway
- Spring Cloud Netflix Eureka
- MongoDB
- JWT Authentication

### Frontend

- React 18
- Vite
- Material UI (MUI)
- Axios
- React Router

## Services

| Service            | Port | Description                                  |
| ------------------ | ---- | -------------------------------------------- |
| Eureka Server      | 8761 | Service Discovery                            |
| API Gateway        | 8080 | Central entry point, JWT validation, routing |
| Auth Service       | 8084 | User registration, login, JWT generation     |
| Student Service    | 8081 | Student CRUD operations                      |
| Tech Stack Service | 8082 | Tech Stack CRUD operations                   |
| Enrollment Service | 8083 | Student-TechStack enrollments                |
| Frontend           | 5173 | React UI                                     |

## Roles & Permissions

| Action                            | USER | ADMIN |
| --------------------------------- | ---- | ----- |
| View Students/TechStacks/Profiles | ✅   | ✅    |
| Create/Update/Delete Students     | ❌   | ✅    |
| Create/Update/Delete TechStacks   | ❌   | ✅    |
| Enroll Students                   | ✅   | ❌    |
| Delete Enrollments                | ❌   | ✅    |

## Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- MongoDB running on localhost:27017
- Maven

### Running the Backend

Start services in this order:

1. **Eureka Server**

   ```bash
   cd Eureka-Server
   mvn spring-boot:run
   ```

2. **Auth Service**

   ```bash
   cd auth-service
   mvn spring-boot:run
   ```

3. **Student Service**

   ```bash
   cd student-service
   mvn spring-boot:run
   ```

4. **Tech Stack Service**

   ```bash
   cd tech-stack-service
   mvn spring-boot:run
   ```

5. **Enrollment Service**

   ```bash
   cd enrollment-service-v2
   mvn spring-boot:run
   ```

6. **API Gateway**
   ```bash
   cd api-gateway
   mvn spring-boot:run
   ```

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## API Documentation

Import `StudentTechDirectory_FullURLs.postman_collection.json` into Postman for API testing.

## Creating an Admin User

By default, registration creates USER role. To create an ADMIN:

1. Register a user normally
2. In MongoDB, update the user's role:
   ```javascript
   db.users.updateOne(
     { username: "your-username" },
     { $set: { role: "ADMIN" } },
   );
   ```

## License

MIT
