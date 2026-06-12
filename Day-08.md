# Docker Interview & Revision Notes

## 1. What is the difference between an Image and a Container?

| Image | Container |
|---------|------------|
| Blueprint or template of an application. | Running instance of an image. |
| Read-only. | Read-write while running. |
| Used to create containers. | Executes the application. |

**Example:**
- Image = Cake recipe 
- Container = Actual cake made from the recipe

---

## 2. What happens to data inside a container when you remove it?

By default, data stored inside a container is deleted when the container is removed.

To keep data permanently, use:
- **Volumes**
- **Bind Mounts**

```bash
docker volume create mydata
```

Volumes survive even if the container is deleted.

---

## 3. How do two containers on the same custom network communicate?

Containers on the same custom Docker network can communicate using their **container names**.

Example:

```bash
docker network create my-network

docker run -d --name web --network my-network nginx
docker run -d --name app --network my-network alpine
```

Inside `app`, you can reach `web` using:

```bash
ping web
```

Docker automatically provides DNS resolution for container names.

---

## 4. What does `docker compose down -v` do differently from `docker compose down`?

### docker compose down

Stops and removes:
- Containers
- Networks

Keeps:
- Volumes

```bash
docker compose down
```

### docker compose down -v

Stops and removes:
- Containers
- Networks
- Volumes

```bash
docker compose down -v
```

Any data stored in volumes will be deleted.

---

## 5. Why are Multi-Stage Builds useful?

Multi-stage builds help create smaller and cleaner images.

Benefits:
- Smaller image size
- Faster downloads
- Better security
- Removes build tools from final image

Example:

```dockerfile
# Build stage
FROM node:22 AS builder
WORKDIR /app
COPY . .
RUN npm install

# Runtime stage
FROM node:22-alpine
COPY --from=builder /app /app
CMD ["node", "app.js"]
```

Only the required files are copied to the final image.

---

## 6. What is the difference between COPY and ADD?

| COPY | ADD |
|--------|------|
| Copies files/directories. | Copies files/directories plus extra features. |
| Simple and predictable. | Can extract local tar files automatically. |
| Preferred in most cases. | Use only when extra features are needed. |

### COPY

```dockerfile
COPY app.js /app/
```

### ADD

```dockerfile
ADD archive.tar.gz /app/
```

Docker automatically extracts the archive.

**Best Practice:** Use `COPY` unless you specifically need `ADD` features.

---

## 7. What does `-p 8080:80` mean?

```bash
docker run -p 8080:80 nginx
```

Format:

```text
HOST_PORT:CONTAINER_PORT
```

Meaning:
- Port **8080** on your computer
- Forwarded to port **80** inside the container

Access:

```text
http://localhost:8080
```

---

## 8. How do you check how much disk space Docker is using?

Use:

```bash
docker system df
```

Example output:

```text
TYPE            TOTAL     ACTIVE    SIZE
Images          5         2         1.2GB
Containers      3         1         200MB
Volumes         4         4         500MB
```

To see detailed usage:

```bash
docker system df -v
```

This shows space used by:
- Images
- Containers
- Volumes
- Build Cache

---

## Quick Summary

| Question | Short Answer |
|-----------|-------------|
| Image vs Container | Image = Template, Container = Running instance |
| Data after container removal | Lost unless stored in volumes |
| Container communication | Use container names on same network |
| compose down vs down -v | `-v` also deletes volumes |
| Multi-stage builds | Smaller and more secure images |
| COPY vs ADD | Use COPY by default |
| -p 8080:80 | Host port 8080 → Container port 80 |
| Check Docker disk usage | `docker system df` |
