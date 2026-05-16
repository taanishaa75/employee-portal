# AI Employee Management Portal

A full-stack HR dashboard built with Java Spring Boot, MySQL, Bootstrap 5, and AI-powered job description generation.

## Features
- View, add, delete employees
- Live search by name or email
- Department and status management
- AI-generated job descriptions per employee

## Tech Stack
- Backend: Java 17, Spring Boot 3.5
- Database: MySQL 8.0, Spring Data JPA
- Frontend: HTML5, CSS3, JavaScript
- UI Framework: Bootstrap 5

## How to Run
1. Clone the repo
2. Create MySQL database: CREATE DATABASE employee_portal;
3. Update application.properties with your MySQL password
4. Run: mvn spring-boot:run
5. Open: http://localhost:8080/index.html

## API Endpoints
- GET /api/employees - Get all employees
- POST /api/employees - Add employee
- DELETE /api/employees/{id} - Delete employee
- GET /api/employees/search?keyword= - Search employees
- POST /api/ai/generate-jd - Generate AI job description