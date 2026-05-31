# Event Bridge - Intra-College Event Management & Communication Platform

Event Bridge connects Students, Organizers, and Faculty advisors in a single portal to manage technical and cultural symposiums, handle approvals, request On-Duty (OD) letters, and message each other in real-time.

## Tech Stack
- **Backend**: Spring Boot 3.2.5 (Java 17), Spring Security + JWT, Spring WebSockets + STOMP, OpenPDF, Spring Mail (SMTP).
- **Frontend**: React.js, Vite, Bootstrap 5, Chart.js, SockJS, StompJS.
- **Database**: MySQL.

---

## Getting Started

### 1. Database Setup
1. Start your local MySQL service.
2. Create the database and import the schema:
   ```sql
   CREATE DATABASE event_bridge_db;
   USE event_bridge_db;
   -- Source the database.sql script present in the project root directory
   SOURCE database.sql;
   ```

### 2. Configure Backend Credentials
Verify or update the connection settings in `backend/src/main/resources/application.properties`:
- `spring.datasource.username` and `spring.datasource.password`
- `spring.mail.username` and `spring.mail.password` (use a Gmail App Password for SMTP alerts)

### 3. Run the Spring Boot Server
Open a terminal in the `/backend` folder and run:
```bash
mvn clean spring-boot:run
```
The backend server runs on `http://localhost:8080`.

### 4. Run the React Web App
Open a terminal in the `/frontend` folder and run:
```bash
npm install
npm run dev
```
The React development server runs on `http://localhost:5173`. Open this URL in your web browser.

---

## Core Features & Testing Walkthrough
1. **Sign Up / Registration**: Register student, organizer, or faculty accounts at `/register`.
2. **Create Symposiums**: Log in as an organizer and publish individual/team events.
3. **Register & Participate**: Log in as a student, search upcoming symposiums, and sign up.
4. **On-Duty (OD) Workflows**: 
   - Once an organizer approves a student registration, a pending OD request is created.
   - Faculty logs in, reviews, and approves the OD.
   - Students can immediately download the verified OD letter PDF from their dashboard.
5. **Real-time Live Chat**: Go to `/chat` and select a contact to exchange messages in real-time via WebSockets.
