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

**2. I write a `docker-compose.yml` in VS code that runs a single Nginx container with port mapping**

```bash
services:
  Nginx:
    image: nginx
    ports:
      - "80:80"
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
docker compose -d
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

### ✅ Task 5 : Custom Networks

**1. I created a custom bridge network called `my-app-net`**

```bash
docker network create --driver bridge my-app-net
```

**2. Then I run 2 containers on `my-app-net`**

**3. Can they ping each other by name now ?**

YES ! Now they can ping each other by thier name

**4. Why does custom networking allow name-based communication but the default bridge doesn't?**

Custom bridge networks include an internal DNS server that resolves container names to IP addresses, enabling name-based communication. The default bridge network lacks this DNS feature, so containers must use IP addresses unless manually linked.

---

### ✅ Task 6 : Put It Together 

**1. Created a custom network**

```bash
docker network create --driver bridge my-network
```

**2. Run a database container (MySQL) on that network with a volume for data**

```bash
#Creating a volume
docker volume create mysql-data 

#Running The Container
docker run -d --network my-network -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:latest
```


**3. Running an app container (pyhton) on the same network :**

```bash
docker run -it --network my-network python
```

**4. Verifying the app container can reach the database by container name (Using Ping)**

```bash
 docker exec pythonc ping mysqlc
```

---

