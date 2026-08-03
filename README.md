# Library Management System

A three-tier Library Management System (React + FastAPI + PostgreSQL) built to demonstrate deploying a Dockerized Python application on AWS EC2.

## What This Project Demonstrates

The focus of this repository is **deploying a Dockerized three-tier application on AWS EC2**. The Library Management System itself is a practical, working example used to exercise that deployment — the deployment process is the primary subject of this project, not the app.

## What This App Does

A simple book management system with full CRUD functionality. Each book has a title, author, ISBN, genre, published year, and number of available copies.

## Architecture

```
Presentation (React)  -->  Application (FastAPI)  -->  Data (PostgreSQL / Neon)
```

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** PostgreSQL (Neon cloud)
- **Deployment:** AWS EC2 + Docker

## Running Locally

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 5000
```

Create a `.env` file in `backend/` (see [Environment Variables](#environment-variables)).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file in `frontend/` (see [Environment Variables](#environment-variables)).

## API Documentation

Base path: `/api/books`

| Method | Endpoint          | Description         |
| ------ | ----------------- | -------------------- |
| GET    | `/api/books`       | List all books       |
| GET    | `/api/books/{id}`  | Get a single book     |
| POST   | `/api/books`       | Create a new book     |
| PUT    | `/api/books/{id}`  | Update a book          |
| DELETE | `/api/books/{id}`  | Delete a book          |

Interactive API docs (Swagger UI) are available at `/docs` when the backend is running.

## Environment Variables

**Backend** (`backend/.env`)

| Variable       | Description                          | Example                                             |
| -------------- | ------------------------------------- | ---------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string          | `postgresql://user:pass@host/db?sslmode=require`     |
| `PORT`         | Port the FastAPI app listens on       | `8000`                                                |
| `CORS_ORIGINS` | Comma-separated allowed origins       | `http://localhost:5173`                               |

**Frontend** (`frontend/.env`)

| Variable       | Description               | Example                  |
| -------------- | -------------------------- | ------------------------- |
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000`  |

## Deployment (AWS EC2 + Docker)

This application is deployed on an AWS EC2 instance using Docker.

> Step-by-step EC2 + Docker deployment guide will be added here after deployment.
