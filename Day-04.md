# Docker – Day 04 - Docker Volumes & Networking

**Containers are ephemeral — they lose data when removed. And by default, containers can't easily talk to each other.**

### ✅ Task 1: The Problem

**First I created and run a MYSQL container and add some data to it :**

```bash
docker run -d -e MYSQL_ROOT_PASSWORD=root mysql:latest
```

**Then i stopped and removed that container :**

```bash
docker stop mysql && docker rm mysql 
```

**At last i cretaed a new one and observed that :**

* My previously stored data was not there.
* Data is Lost.

**What happened and why :**

* Containers are ephemeral (temporary)
* MySQL stores data inside container filesystem (/var/lib/mysql)
* When you delete the container → that filesystem is deleted too
* No volume = No persistence

---

### ✅ Task 2: Named Volumes



---

### ✅ Task 3: Bind Mounts

**1. Created a folder on my host machine with an `index.html` file**


**2. Run an Nginx container and bind mount my folder to the Nginx web directory**

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

**Can they ping each other by name now ?**
YES ! Now they can ping each other by thier name

**Why does custom networking allow name-based communication but the default bridge doesn't?**

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
docker volume create 

docker network create --driver bridge my-network
```


Run an app container (use any image) on the same network
Verify the app container can reach the database by container name



