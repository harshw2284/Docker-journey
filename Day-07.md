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

### ✅ Task 3: Push to Docker Hub

**1. First created a free account on Docker Hub**

**2. Log in from the Terminal**

```bash
docker login
```

**3. Tag image properly**

```bash
yourusername/image-name:tag
harsh9301/go-image:v2
```

**4. Push it to Docker Hub**

```bash
docker push harsh9301/go-image:v2
```

**5. Pull it on a different machine (or after removing locally)**

```bash
docker pull harsh9301/go-image:v2
```

---

### ✅ Task 4 : Image Best Practices


---
