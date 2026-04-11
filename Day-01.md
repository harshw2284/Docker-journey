# Docker – Day 01 - Introduction to Docker


### ✅ Task 1: What is Docker?

**1. What is a container and why do we need them:**

A container is a lightweight package that includes:

* Your app
* All its dependencies (libraries, configs, etc.)

So it can run anywhere without problems 

we need containers to solve problems like "its not working on my machine".

**2. Containers vs Virtual Machines — what's the real difference**

| Features | Conatainers | Virtual Machines |
|----------|-------------|------------------|
| size     | small               | large |
| speed    | fast                | slow |
| Os       | shared host os      | full os inside |
| Use case | apps ,microservices | full sysytem isolation |

**3. What is the Docker architecture? (daemon, client, images, containers, registry)**

* Docker Client : The command line (what you use)

* Docker Daemon : The brain (runs in background)

Builds images
Runs containers
Manages everything

* Images : Blueprint of your app

Like a template
Used to create containers

* Containers : Running version of image

Actual working app
Created from images

* Registry : Storage for images

Example: Docker Hub

You pull images from here
You can also push your own



**Use: To check git version on your local**

---

### ✅ Task 2: Install Docker

**1. Installing on Linux**

```bash
sudo apt update
sudo apt install docker.io -y
```

**2. Verify the installation**

* check version

```bash
docker --version
```

* start docker
  
```bash
sudo systemctl start docker
```

  

**3. Run Hello World Container**

```bash
docker run hello-world
```

---

### ✅ Task 3: Run Real Containers

**1. Run an Nginx container and access it in your browser**

```bash
docker run -d -p 80:80 nginx
```

* check (open browser):

```bash
http://localhost:8080
```

**2. Run Ubuntu in Interactive Mode**

```bash
docker run -it ubuntu
```

**3. List all running containers**

```bash
docker ps
```

* List All Containers (Including Stopped):

```bash
docker ps -a
```

**5. Stop a Container**

```bash
docker stop <container_id>
```

* Remove a Container :

```bash
docker rm <container_id>
```

---

### ✅ Task 4 : Explore

**1. Run a Container in Detached Mode**

```bash
docker run -d nginx
```

* Difference :

`-d` (detached mode) → runs container in background

Your terminal is free immediately 

You don’t see logs/output directly

**2. Give a Container a Custom Name**

```bash
docker run -d --name mynginx nginx
```

**3. Map a port from the container to your host**

```bash
docker run -d -p 8080:80 --name web nginx
```

**4. Check Logs of a Running Container**

```bash
docker logs <container-name> or <cont-id>
```

**5. Run a Command Inside a Running Container**

```bash
docker exec -it <container-name> bash
```

* Exit :

```bash
exit
```

---


