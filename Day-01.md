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


**2. Set up your Git identity — name and email**

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

**3. Verify your configuration**

```bash
git config --global user.name 
git config --global user.email 
```

---

### ✅ Task 2: Creating our Git Project

**Initialize Folder as a Git repository**

```bash
git init
```

**Check the status**

```bash
git status
```
**Use: Shows the current state of the repository — which files are modified, staged, or untracked, and what is ready to commit.**

---

### ✅ Task 3: Stage and Commit

**Staging the file**

```bash
git add <file-name>
```

**Commit the file**

```bash
git commit -m "<message>"
```

**Show commit history**

```bash
git log
git log --oneline
```

---

## 💡 Key Learnings

*  ".git/" : it stores all the information Git needs to track your project.
It contains :

Commits history (all versions of your project)
Branches & HEAD (current branch info)
Staging area (index)
Configuration settings

* If you delete the .git folder, your project will no longer be a Git repository.

* git add vs git commit

    git add : Moves changes to the staging area (prepares files for commit)

    git commit : Saves the staged changes permanently in Git history

* Working Directory vs Staging Area vs Repository

    Working Directory : Where you write and modify your files

    Staging Area (Index) : Where you prepare files using git add before committing

    Repository : Where all committed changes are permanently stored

* Staging Area (Why it exists)
    The staging area lets you select and organize changes before committing.

    👉 What it does:
    Allows you to choose specific files or parts of changes
    Helps create clean and meaningful commits

    👉 Why not commit directly?
    Without staging, all changes would be committed at once
    No control over what goes into a commit

---
