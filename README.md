# BerryBeans IT Company Website

A modern, professional IT company website built with React, Vite, Tailwind CSS, Spring Boot, and MySQL.

## Project Architecture
- **Frontend**: React.js with Vite, Tailwind CSS, React Router, Axios, Lucide React icons.
- **Backend**: Spring Boot 3, Spring Security (JWT Auth), Spring Data JPA, Hibernate, MySQL.

## Prerequisites
- Node.js (v18+)
- Java 17+
- Maven
- MySQL Server

## Setup Instructions

### 1. Database Setup
1. Create a MySQL database named `berrybeans`:
   ```sql
   CREATE DATABASE berrybeans;
   ```
2. The application is configured to connect with user `root` and password `1234`. You can change this in `backend/src/main/resources/application.properties`.
3. The `data.sql` file will automatically insert the Admin user credential:
   - **Username**: `admin`
   - **Password**: `admin123`

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory.
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
3. The API will be available at `http://localhost:8080`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the frontend app at `http://localhost:5173`.

## Features
- Public Website: Home, About, Services, Portfolio, Careers, Contact
- Responsive Glassmorphism Design
- Admin Dashboard (JWT Secured)
- Content Management CRUD capabilities for Projects, Jobs, Messages
