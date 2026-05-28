# Docker – Day 05 - Docker Compose: Multi-Container Basics

**Today's goal is to run multi-container applications with a single command.**

**Docker Compose does all of that in one YAML file.**

### ✅ Task 1: Install & Verify

**1. To Check if Docker Compose is available on your machine**

```bash
systemctl status docker compose

OR

command -v docker compose
```

**2. Verify the version**

```bash
docker compose --version 
```

---

### ✅ Task 2: My First Compose File

**1. I Created a folder named compose-basics**

**2. I write a `docker-basic-compose.yml` in VS code that runs a single Nginx container with port mapping**

```bash
services:
  wordpress:
    image: wordpress
    restart: always
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql-db:3306
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppassword
      WORDPRESS_DB_NAME: wordpress
    depends_on:
      - mysql-db
  mysql-db:
    image: mysql:latest
    container_name: mysql_server
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppassword
    volumes:
      - mysql-app:/var/lib/mysql

volumes:
  mysql-app:
```

**3. Start it with docker compose up(Inside vs code terminal)**

```bash
docker compose up
```

**4. Accessing it in browser**

```bash
localhost:80
```

**5. Stop it with docker compose down**

```bash
docker compose down
```

---

### ✅ Task 3: Two-Container Setup

**1. Write a `docker-compose.yml` that runs:**

* A WordPress container
* A MySQL container



**2. They should:**

* Be on the same network (Compose does this automatically)
* MySQL should have a named volume for data persistence
* WordPress should connect to MySQL using the service name
* Start it, access WordPress in your browser, and set it up.

**3. Verify: Stop and restart with docker compose down and docker compose up — is your WordPress data still there?**

**Yes ! Our data is still there.** 

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
