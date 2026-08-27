# 📝 Todo App — Dockerized (Node/Express + Nginx)
 
A full-stack Todo application containerized with **Docker Compose**. The frontend is a vanilla HTML/CSS/JS app served by **Nginx**, and the backend is a REST API built with **Node.js/Express**, backed by an in-memory data store.
 
---
 
##  Tech Stack
 
| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | HTML, CSS, JavaScript (vanilla)      |
| Web Server | Nginx (serves static files + reverse proxy) |
| Backend    | Node.js, Express, UUID, CORS         |
| Containers | Docker, Docker Compose               |
 
---
 
## Project Structure
 
```
.
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── style.css
│   └── app.js
└── backend/
    ├── Dockerfile
    ├── .dockerignore
    ├── package.json
    └── server.js
```
 
> Adjust the tree above if your folders are named differently — `docker-compose.yml` expects `./frontend` and `./backend` build contexts.
 
---
 
## Features
 
- Add, complete, and delete todos
- Filter by **All / Active / Completed**
- REST API with health-check endpoint
- Nginx reverse-proxies `/api/*` requests to the backend, so the frontend and backend can be accessed from a single origin
- Backend container has a Docker **healthcheck**, and the frontend waits until the backend is healthy before starting
---
 
## ✅ Prerequisites
 
Make sure you have installed:
 
- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+, usually bundled with Docker Desktop)
Check your versions:
 
```bash
docker --version
docker compose version
```
 
---
 
## 🚀 Getting Started
 
**1. Clone the repository**
 
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```
 
**2. Build and start the containers**
 
```bash
docker compose up --build
```
 
To run in detached mode (background):
 
```bash
docker compose up --build -d
```
 
**3. Open the app**
 
| Service   | URL                              |
|-----------|-----------------------------------|
| Frontend  | http://localhost:3000            |
| Backend API | http://localhost:4000/api/todos |
| Backend health check | http://localhost:4000/health |
 
That's it — the app should be up and running! 
 
---
 
## 🔌 API Endpoints
 
| Method | Endpoint            | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/todos`         | Get all todos            |
| POST   | `/api/todos`         | Create a new todo (`{ "text": "..." }`) |
| PATCH  | `/api/todos/:id`     | Toggle a todo's completed state |
| DELETE | `/api/todos/:id`     | Delete a todo            |
| GET    | `/health`             | Backend health check      |
 
---
 
## 🛠️ Useful Commands
 
```bash
# Stop the containers
docker compose down
 
# Stop and remove volumes/networks too
docker compose down -v
 
# Rebuild images from scratch (no cache)
docker compose build --no-cache
 
# View logs (all services)
docker compose logs -f
 
# View logs for a single service
docker compose logs -f backend
 
# List running containers for this project
docker compose ps
 
# Restart a single service
docker compose restart backend
```
 
---
 
## ⚙️ Environment Variables
 
| Variable   | Service  | Default | Description            |
|------------|----------|---------|-------------------------|
| `PORT`     | backend  | `4000`  | Port the Express server listens on |
| `NODE_ENV` | backend  | `development` | Node environment    |
 
These are set in `docker-compose.yml` and can be overridden with a `.env` file or by editing the `environment:` section.
 
---
 
## 📌 Notes
 
- Todos are stored **in-memory** on the backend — restarting the `backend` container will reset the data. Swap in a real database (e.g., Postgres, MongoDB) for persistence.
- The frontend container won't start serving traffic as "healthy" until the backend passes its healthcheck, thanks to `depends_on.condition: service_healthy` in `docker-compose.yml`.
---
 
