# Docker – Day 03 -  Dockerfile: Build Your Own Images

### ✅ Task 1: My First Dockerfile

**1. First I created a docker file named "my-first-image"**

**2. Then i create a Dockerfile :**
* Uses `ubuntu` as the base image
* Installs `curl`
* Sets a default command to print `"Hello from my custom image!"`

**3. DockerFile :**
```bash
FROM ubuntu:latest

RUN apt-get update && apt-get install curl -y

CMD ["echo" , "Hello from my custom image!"]

```

**4. Let's Build the image:**

```bash
docker build -t my-ubuntu:v1 .
```

**5. Running the container from image.**

```bash
docker run -itd ubuntu
```

---

### ✅ Task 2: Dockerfile Instructions

**Create a new Dockerfile that uses all of these instructions:**

* `FROM` — base image
* `RUN` — execute commands during build
* `COPY` — copy files from host to image
* `WORKDIR` — set working directory
* `EXPOSE` — document the port
* `CMD` — sets the default command that will execute when a container starts

**Dockerfile :**

```bash
FROM python:3.14

WORKDIR /app

COPY requirement.txt .

RUN pip install requirements.txt

EXPOSE 80

CMD [ "pyhton" , "app.py" ]
```
  
---

### ✅ Task 3: Container Lifecycle

**1. Create a container (without starting it)**

```bash
docker create --name <any-name> <container-name>
```

**2. Start the Container**

```bash
docker start <container-name>
```

**3. Pause the Container**

```bash
docker pause <container-name>
```

**4. Unpause the Container**

```bash
docker unpause <container-name>
```

**5. Stop the Container**

```bash
docker stop mycontainer
```

**6. Restart the Container**

```bash
docker restart mycontainer
```

**7. Kill the Container**

```bash
docker kill mycontainer
```

**8. Remove the Container**

```bash
docker rm mycontainer
```

---

### ✅ Task 4 : Working with Running Containers

**1. Run an Nginx container in detached mode**

```bash
docker run -d -p 80:80 nginx
```

**2. View logs**

```bash
docker logs <container-name>
```

**3. Real-Time Logs (Follow Mode)**

```bash
docker logs -f <container-name>
```

**4.Exec into the Container**

```bash
docker exec -it <container-name> bash
```

**5. Run Single Command (without entering)**

```bash
docker exec <container-name> <command>
```

**6. Inspect the container**

```bash
docker inspect <container-name>
```

---

### ✅ Task 5 : Cleanup

**1. Stop ALL Running Containers**

```bash
docker stop $(docker ps -q)
```

**2. Remove ALL Stopped Containers**

```bash
docker container prune
```

**3. Remove Unused Images**

```bash
docker image prune
```

**4. For full cleanup**

```bash
docker system prune -a
```

**5. Check how much disk space Docker is using**

```bash
docker system df
```

---





