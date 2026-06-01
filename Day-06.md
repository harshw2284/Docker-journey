# Docker – Day 06 - Docker Compose: Real-World Multi-Container Apps

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

### ✅ Task 4 : Custom Dockerfiles in Compose

**1. Instead of using a pre-built image for your app, use `build:` in your compose file to build from a Dockerfile**

**Pre-built Image:**

```bash
image: myflaskapp
```

**Creating Image using `build:`**

```bash
web:
  build: .
  container_name: flask_app
```

**Docker Compose will build the image using the local Dockerfile.**


**2. Rebuild and restart with one command**

```bash
docker compose up --build
```

**What it does:**

* Rebuilds app image
* Recreates containers
* Starts updated application

---

### ✅ Task 5 : Scaling (Bonus)

**1. Try scaling your web app to 3 replicas using docker compose up --scale**

```bash
docker compose up --scale web=3
```

**This tells Docker Compose to create 3 replicas of the web service**


**2. What happens? What breaks?**

* What Happened :

**Docker tried to create 3 Flask containers, But an error occurred because all replicas attempted to use the same host port:**

```bash
ports:
  - "5000:5000"
```

**Only one container can bind to host port 5000.**

* What Broke :

**Port conflict occurred.**

**Example error:**

**Bind for 0.0.0.0:5000 failed: port is already allocated**

* Reason:

**Multiple containers cannot use the same host port simultaneously.**


**3. Write in your notes: Why doesn't simple scaling work with port mapping?**

**Each replica tries to map:**

**host_port:container_port**

**5000:5000**

**Host machine has only one port 5000.**

**So :**

* First container gets port 5000
* Other replicas fail

---


