# 🐳 Docker Cheat Sheet

Quick reference for day-to-day Docker usage.

---

# Container Commands

| Command | Description |
|----------|-------------|
| `docker run -d --name app nginx` | Run a container in detached mode |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop <container>` | Stop a running container |
| `docker rm <container>` | Remove a container |
| `docker exec -it <container> sh` | Open a shell inside a container |
| `docker logs <container>` | View container logs |
| `docker logs -f <container>` | Follow container logs in real time |

---

# Image Commands

| Command | Description |
|----------|-------------|
| `docker build -t myapp .` | Build an image from a Dockerfile |
| `docker pull nginx` | Download an image from a registry |
| `docker push myrepo/myapp:latest` | Push an image to a registry |
| `docker tag myapp:latest myrepo/myapp:v1` | Create a new image tag |
| `docker images` | List local images |
| `docker rmi <image>` | Remove an image |

---

# Volume Commands

| Command | Description |
|----------|-------------|
| `docker volume create mydata` | Create a volume |
| `docker volume ls` | List volumes |
| `docker volume inspect mydata` | Show volume details |
| `docker volume rm mydata` | Remove a volume |

---

# Network Commands

| Command | Description |
|----------|-------------|
| `docker network create mynet` | Create a custom network |
| `docker network ls` | List networks |
| `docker network inspect mynet` | Show network details |
| `docker network connect mynet app` | Connect a container to a network |

---

# Docker Compose Commands

| Command | Description |
|----------|-------------|
| `docker compose up -d` | Start services in background |
| `docker compose down` | Stop and remove services |
| `docker compose down -v` | removes named volumes declared in the Compose file |
| `docker compose ps` | Show running services |
| `docker compose logs` | View service logs |
| `docker compose build` | Build service images |

---

# Cleanup Commands

| Command | Description |
|----------|-------------|
| `docker system prune -f` | Remove unused containers, networks, and cache |
| `docker system prune -a -f` | Remove all unused Docker resources |
| `docker volume prune -f` | Remove unused volumes |
| `docker image prune -a -f` | Remove unused images |
| `docker system df` | Show Docker disk usage |

---

# Dockerfile Instructions

| Instruction | Purpose |
|-------------|---------|
| `FROM` | Base image for the build |
| `RUN` | Execute commands during image build |
| `COPY` | Copy files into the image |
| `WORKDIR` | Set working directory |
| `EXPOSE` | Document container port |
| `CMD` | Default command when container starts |
| `ENTRYPOINT` | Main executable for the container |

---

# Common Examples

### Build Image
```bash
docker build -t myapp .
```

### Run Container
```bash
docker run -d -p 3000:3000 --name app myapp
```

### Enter Container
```bash
docker exec -it app sh
```

### View Logs
```bash
docker logs -f app
```

### Start Compose Stack
```bash
docker compose up -d
```

### Stop Compose Stack
```bash
docker compose down
```

---

## Pro Tips

- Use `--name` to avoid random container names.
- Use `.dockerignore` to reduce image size.
- Prefer multi-stage builds for production images.
- Use volumes for persistent data.
- Keep one process per container whenever possible.
- Always pin image versions (`node:22-alpine`) instead of using `latest`.
