# Docker – Day 05 - Multi-Stage Builds & Docker Hub

**Today's goal is to build optimized images and share them with the world.**

**Multi-stage builds are how real teams ship small, secure images. Docker Hub is how you distribute them.**


### ✅ Task 1: The Problem with Large Images

**1. Create a simple Go app which contains:**

* go.mod  
* main.go
* dockerfile  

**go.mod :**

```bash
module hello

go 1.24
```

**main.go :**

```bash
package main

import "fmt"

func main() {
        fmt.Println("Hello from Go running inside Docker!")
}
```

**Dockerfile :**

```bash
FROM golang:1.24

WORKDIR /app

COPY . .

RUN go build -o hello .

CMD [ "./hello" ]
```

**2. Building image :**

```bash
docker build -t go-image:v1 .
```

**3. After checking image size it's about 800MB.**

---

### ✅ Task 2: Multi-Stage Build

**1. Rewrite the Dockerfile using multi-stage build:**

* Stage 1: Build the app (install dependencies, compile)
* Stage 2: Copy only the built artifact into a minimal base image (alpine, distroless, or scratch)

```bash
# Stage 1: Build
FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod .
COPY main.go .

RUN go mod tidy
RUN go build -o hello .

# Stage 2: Runtime
FROM alpine:latest

WORKDIR /app

# Copy only the compiled binary from builder stage
COPY --from=builder /app/hello .

CMD ["./hello"]
```

**2.Build the image and check its size again**

```bash
docker build -t go-image:v2 .
```

**3. It's size is about 10MB.**

**4. Why is the multi-stage image so much smaller?**

A multi-stage build separates the build environment from the runtime environment. The first stage contains compilers, build tools, source code, and dependencies needed to build the application. In the final stage, only the required artifacts (such as the compiled binary or application files) are copied using COPY --from=<stage>. As a result, unnecessary components like compilers, build caches, source code, and development tools are excluded from the final image, significantly reducing its size and improving security and deployment speed.


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


