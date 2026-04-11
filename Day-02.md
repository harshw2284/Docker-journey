# Docker – Day 02 -  Docker Images & Container Lifecycle


### ✅ Task 1: Docker Images

**1. Pull the nginx, ubuntu, and alpine images from Docker Hub:**

```bash
docker pull nginx
docker pull ubuntu
docker pull alpine
```

**2. List all images on your machine**

```bash
docker images
```

* Sizes :
  
| Image | Disk-usage | Content Size |
|-------|------------|--------------|
| alpine   | 13.1MB |  3.95MB |
| nginx    | 240MB  |  65.8MB |
| Ubuntu   | 119MB  | 31.7MB  |

**3. Compare ubuntu vs alpine — why is one much smallerv?**

* Alpine Linux :
Minimal OS (only essentials)

Uses musl libc instead of glibc

No extra tools/packages

Designed for containers

* Ubuntu :
Full-featured OS

Includes many libraries & tools

Uses glibc

Bigger but more compatible


**4. Inspect an image **

```bash
docker inspect <container-name>
```


**5. Remove an image you no longer need**

```bash
docker rmi <image-id>
```

---

### ✅ Task 2: Image Layers

**1.To Inspect the creation history of the image, showing exactly how it was built layer-by-layer**

```bash
docker image history nginx
```

**2.What are layers and why does Docker use them ?**

* Docker images are built as a stack of read-only layers.
Each layer represents a change (like installing packages, copying files, or setting configs).
These layers are combined to form the final image.


* Why Docker Uses Layers :

Efficiency (Storage Saving)

Faster Builds

Faster Downloads

Version Control
  
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





