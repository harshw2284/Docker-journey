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

### ✅ Task 3:  CMD vs ENTRYPOINT

**1. Creating a image with  `CMD ["echo", "hello"]`**

```bash
FROM ubuntu

CMD ["echo", "hello"]
```

**After building image and running it**
* Output :

```bash
hello
```

**Running with custom command :**

```bash
docker run cmd-test echo "hi"
```

* Output :

```bash
hi
```

**2.  Creating a image with  `ENTRYPOINT ["echo"]`**

```bash
FROM ubuntu

ENTRYPOINT ["echo"]
```

**After building image and running it**
* Output :

```bash
(None)
```

**Running with custom command :**

```bash
docker run cmd-test hi
```

* Output :

```bash
hi
```

**When would we use CMD vs ENTRYPOINT ?**

**CMD :**

* Use `CMD` when you want your container to run a default command, but you expect that whoever runs the container might want to run something entirely different.
* Use `CMD` if your container is a general-purpose tool and the user might want to run various commands inside it.

**ENTRYPOINT :**

* Use `ENTRYPOINT` when your container is built to do one specific job, and it should essentially act exactly like that specific program.
* Use `ENTRYPOINT` if your container is designed to be a single-purpose application (like a database, a web server, or a specific script)

---

### ✅ Task 4 : Build a Simple Web App Image

**1. First I created a simple HTML file named "index.html"**

**2. Now let's write a dockerfile for it :**

```bash
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/

EXPOSE 80
```

**NOTE : Nginx serves files from `/usr/share/nginx/html/`**

**3. Building the image and tagging it `my-website:v1`**

```bash
docker build -t my-website:v1 .
```

**4. Running the Container :**

```bash
docker run -d -p 80:80 my-website:v1
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





