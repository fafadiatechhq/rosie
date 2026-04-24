# DEVNOTES

These are general develop instructions


## Backend

1. Once the environment is setup ensure you setup pre-commit correctly `pip3 install pre-commit`
1. With virtualenv activiated do `pre-commit install` from project's root directory


## Docker Instructions

These are general development instructions for setting up the project.

1. Option 1: Docker Setup (Without Dev Container) 
1. Option 2: VS Code Dev Container Setup

**Note:** Devcontainers have a good IDE integration as opposed to running `docker compose up`

### Option 1: Docker Setup (Without Dev Container)

Prerequisites:

1. Docker installed
1. Docker Compose installed

#### Steps

1. Clone the repository
   ```sh
   git clone <repo-url>
   cd <repo-name>
   ```
1. Create environment file `cp .env.template .env`
1. Build Docker images `docker compose build`
1. Start the containers `docker compose up -d`
1. Check running containers `docker compose ps`

The application should now be running.

To stop `docker compose down`

### Option 2: VS Code Dev Container Setup

We use VS Code Dev Containers for local development. [Official reference](https://code.visualstudio.com/docs/devcontainers/containers)


##  Prerequisites

### 1. Install Docker & Docker Compose

####  Install Docker (Ubuntu/Linux)

``` bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

####  Add your user to Docker group (avoid sudo)

``` bash
sudo usermod -aG docker $USER
newgrp docker
```

####  Verify installation

``` bash
docker --version
docker compose version
```



### 2. Install VS Code

Download and install from: https://code.visualstudio.com/



### 3. Install Required VS Code Extension

Open VS Code → Extensions → install:

-   **Dev Containers** (by Microsoft)



##  Project Setup

### 1. Create a working directory

``` bash
mkdir ~/Code
cd ~/Code
```



### 2. Clone the repository

``` bash
git clone <your-repo-url>
cd rosie
```



### 3. Setup environment variables

Go to backend directory:

``` bash
cd backend/rosie
```

Copy example env file:

``` bash
cp example.env .env
```



##  Running the Project

### 1. Open project in VS Code

From project root:

``` bash
code .
```



### 2. Reopen in Dev Container

-   Press: `Ctrl + Shift + P`
-   Search: **Dev Containers: Reopen in Container**
-   Click it

⏳ It will take \~5--10 minutes to: - Build Docker images - Start
containers - Install dependencies



##  Verify Containers

To check running containers:

``` bash
docker ps
```

You should see: - Backend (Django) - Frontend - PostgreSQL



##  Access the Application

  Service    URL
  ---------- -----------------------
  Backend    http://localhost:8000
  Frontend   http://localhost:3000



##  Django Admin Credentials

Check your `.env` file:

``` env
DJANGO_SUPERUSER_USERNAME=newscout
DJANGO_SUPERUSER_PASSWORD=newscout
```

Use these credentials to log in.



##  Notes

-   Containers start automatically via Dev Container setup
-   No need to manually run migrations or create superuser
-   Everything is handled via Docker + entrypoint script



##  Troubleshooting

### Containers not running?

``` bash
docker ps -a
docker logs <container-name>
```



### Rebuild containers

``` bash
docker compose down -v
docker compose up --build
```
