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

**1. Write a docker-compose.yml that runs:**

* A WordPress container
* A MySQL container



**2. They should:**

* Be on the same network (Compose does this automatically)
* MySQL should have a named volume for data persistence
* WordPress should connect to MySQL using the service name
* Start it, access WordPress in your browser, and set it up.

```bash
docker run -d -v /local/path:/container/path -p 80:80 <image_name>
docker run -d -v /home/user/data:/app -p 80:80 nginx
```

**3. Accessing the page in browser**

```bash
localhost:80
```
**4. Edited `index.html` on host.**

* After refreshing the browser I observed that changes in `index.html` file done from host are implemented.

**Difference between a named volume and a bind mount :**

**Named Volume :**
* Managed by Docker (not visible directly)
* Data persists even if container is deleted
* Portable & clean
* Not easily editable manually
* No instant file editing like bind mount

**Bind Mount :**
* Maps your local folder → container
* Real-time changes (great for development)
* You can see/edit files directly
* Depends on your system path
* Less portable

---

### ✅ Task 4 : Docker Networking Basics

**1. List all Docker networks on your machine**

```bash
docker network ls
```

**2. Inspect the default bridge network**

```bash
docker network inspect bridge
```
**3. I run 2 containers on default bridge**
* can they ping each other by name :
  
NO ! On Docker’s default bridge, containers cannot ping each other by name. (only by IP)

Default bridge has no automatic DNS service , and Containers don’t know each other by name

* can they ping each other by IP :

YES ! On the default bridge network, containers can ping each other by IP.
Default bridge allows IP-level communication , Containers are on the same subnet.

But no DNS, so names don’t resolve

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

