
# IRCTC App

A full-stack web application that simulates the core functionalities of IRCTC — train search, booking, ticket management — using **Spring Boot** for the backend and **React** for the frontend.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Folder Structure](#folder-structure)
5. [Features](#features)
6. [Getting Started](#getting-started)
7. [API Endpoints](#api-endpoints)
8. [Frontend Setup](#frontend-setup)
9. [Backend Setup](#backend-setup)
10. [Future Enhancements](#future-enhancements)

---

## Project Overview

This project is a modern **IRCTC-like train booking platform**, allowing users to:

* Search trains by source, destination, and date.
* Book tickets with seat selection.
* Manage user profiles and view bookings.
* Secure authentication with JWT tokens.

The system is designed with **Spring Boot (REST API)** on the backend and **React 18+** with **Vite** on the frontend.

---

## Tech Stack

**Backend:**

* Spring Boot 3.2+ (Java 21 LTS)
* Spring Security (JWT-based authentication)
* Spring Data JPA (MySQL / PostgreSQL)
* Maven 4 / Gradle 9
* REST API

**Frontend:**

* React 18+
* React Router 6+
* Redux Toolkit / Zustand for state management
* Axios for API calls
* Tailwind CSS / Material-UI for UI

**Database:**

* MySQL 8.1+ or PostgreSQL 16+

**Others:**

* JWT for authentication
* Lombok for boilerplate reduction
* Docker for containerization (optional)

---

## Architecture

```
Frontend (React) <------> Backend (Spring Boot REST API) <------> Database (MySQL/PostgreSQL)
```

**Flow:**

1. User interacts with React UI.
2. React sends HTTP requests (GET/POST) via Axios to Spring Boot REST APIs.
3. Spring Boot validates JWT, processes business logic, interacts with database via JPA.
4. Database stores/retrieves data.
5. Backend sends JSON responses back to frontend.

---

## Folder Structure

### Backend (Spring Boot)

```
irctc-backend/
├── src/main/java/com/irctc
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── dto
│   ├── config
│   └── exception
├── src/main/resources
│   ├── application.yml
│   └── data.sql
└── pom.xml
```

### Frontend (React + Vite)

```
irctc-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## Features

**User Module**

* Sign Up / Login (JWT authentication)
* Update Profile

**Train Module**

* Search Trains by Source/Destination/Date
* Train Details & Seat Availability

**Booking Module**

* Book Tickets with seat selection
* Cancel / View Bookings

**Admin Module (Optional)**

* Add / Update / Delete Trains
* Manage Bookings

---

## Getting Started

### Prerequisites

* Java 21 LTS
* Node.js 20+
* MySQL/PostgreSQL 16+
* Maven 4 or Gradle 9

---



 Enhancements

* Integrate **payment gateway** (Razorpay / Stripe)
* Admin dashboard for train/booking management
* Notifications via email/SMS
* PWA / Mobile App support
* Dockerized deployment with Kubernetes


