# Rosie

Rosie is a high-performance, distributed web crawler designed to efficiently explore and index massive datasets across the internet or within private networks.

---

# Rosie App – Development Setup (Dev Container)

This guide explains how to set up the Rosie project (Backend + Frontend + PostgreSQL) using a VS Code Dev Container.

---

## Prerequisites

Make sure you have the following installed:

- VS Code 
- Docker 
- Git 

VS Code Extension:
- Dev Containers (ms-vscode-remote.remote-containers)

---

## Project Structure

```bash
rosie/
├── backend/
├── frontend/
├── docker-compose.yml
├── docker-compose.dev.yml
├── README.md
└── DEVNOTES.md
```

---

## Setup Steps

### 1. Install Dev Containers Extension

- Open VS Code 
- Go to Extensions (Ctrl + Shift + X) 
- Search for Dev Containers 
- Install it 

---

### 2. Create Workspace Directory

```bash
mkdir ~/Code
cd ~/Code
```

---

### 3. Clone the Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

---

### 4. Checkout Develop Branch

```bash
git checkout develop
git pull origin develop
```

---

### 5. Setup Backend Environment File

Navigate to backend directory:

```bash
cd backend/rosie
```

Create .env file:

```bash
touch .env
```

Add the following content inside .env:

```bash
POSTGRES_DB=rosie
POSTGRES_USER=rosie
POSTGRES_PASSWORD=rosie
POSTGRES_HOST=rosie-db
POSTGRES_PORT=5432

DJANGO_SUPERUSER_USERNAME=rosie
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=admin123
```

---

### 6. Open Project in VS Code

```bash
cd ~/Code/<repo-folder>
code .
```

---

### 7. Rebuild and Start Dev Container

- Press: Ctrl + Shift + P 
- Select: Dev Containers: Rebuild and Reopen in Container 

This will:
- Build Docker containers 
- Start backend (Django) 
- Start frontend (Next.js) 
- Start PostgreSQL database 
- Install all dependencies 
---

## Running the Application

Once the container is built:

Backend (Django):
http://localhost:8000

Frontend (Next.js):
http://localhost:3000

Database (PostgreSQL):
- Host: rosie-db 
- Port: 5432 
- Database: rosie 

Backend, frontend, and PostgreSQL all run together using Docker Compose.

---

## Services Overview

- Backend → Django application 
- Frontend → Next.js application 
- Database → PostgreSQL container 

---

## Notes

- Ensure Docker is running before opening the project 
- First build may take time 
- This setup runs frontend + backend + database together 

If something breaks:

```bash
Dev Containers: Rebuild Container (without cache)
```
