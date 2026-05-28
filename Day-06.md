# Docker – Day 05 - Docker Compose: Real-World Multi-Container Apps

**Today's goal is to build more complex, production-like setups with Docker Compose.**

**Today I will handle real scenarios — app + database + cache, healthchecks, restart policies, and service dependencies.**



### ✅ Task 1:  Build Your Own App Stack

**Create a docker-compose.yml for a 3-service stack:**

* A web app (use Python Flask, Node.js, or any language you know)
* A database (Postgres or MySQL)
* A cache (Redis)

**Dockerfile:**
```bash
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "python" , "app.py" ]
```

---

### ✅ Task 2: depends_on & Healthchecks

**1. Add `depends_on` to your compose file so the app(python flask) starts after the database**

```bash
depends_on:
      - redis
      - mysql
```

**2.Add a healthcheck on the database service with `condition: service_healthy` so the app waits for the database to be truly ready, not just started**

```bash
healthcheck: 
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"] 
      interval: 10s 
      timeout: 5s 
      retries: 5 
      start_period: 20s

depends_on:
      redis:
        condition: service_healthy
        
      mysql:
        condition: service_healthy
```

---

### ✅ Task 3: Restart policies

**1. Add `restart: always` to your database service**

```bash
 mysql:
    image: mysql:8.0
    container_name: mysql_server
    restart: always
    ports:
      - "3306:3306"
```


**2. Manually kill the database container — does it come back?**

```bash
docker kill mysql_server
```

**Result:**

**Docker automatically restarted the MySQL container after it was killed.**

**Reason:**

**`restart: always` tells Docker to always keep the container running.**

**3. Try `restart: on-failure` — how is it different?**

```bash
mysql:
    image: mysql:8.0
    container_name: mysql_server
    restart: on-failure
```

**Container restarts only if it exits with an error/non-zero exit code.
It does NOT restart if container is manually stopped.**

**4. Write in your notes: When would you use each restart policy?**

| Restart Policy | Behavior | Restarts After Crash | Restarts After Manual Stop/Kill | Best Use Case | 
|---|---|---|---|---|
| `restart: always` | Container always tries to stay running | ✅ Yes | ✅ Yes | Production databases, backend servers, critical services |
| `restart: on-failure` | Restarts only when container exits with an error | ✅ Yes | ❌ No | Batch jobs, worker scripts, retryable tasks |

---

### ✅ Task 4 : Compose Commands

**1. Start services in detached mode**

```bash
docker compose up -d
```

**2. View running services**

```bash
docker compose ps
```

**3. View Logs of All Services**

```bash
docker compose logs
docker compose logs -f  (live logs)
```

**4. View Logs of Specific Service**

```bash
docker compose logs <service-name>
docker compose logs my-sql
docker compose logs -f mysql-db  (live logs)
```

**5. Stop services without removing**

```bash
docker compose stop
docker compose start  (Restart quickly)
```

**6. Remove Everything (containers, networks)**

```bash
docker compose down
docker compose down -v  (including volumes)
```

**7. Rebuild Images After Changes**

```bash
docker compose up --build
docker compose up -d --build  (detached mode)
```

---

### ✅ Task 5 : Environment Variables


---

**NOTE :**
* Compose creates a default network for all services automatically
* Service names in compose are the DNS names containers use to talk to each other
