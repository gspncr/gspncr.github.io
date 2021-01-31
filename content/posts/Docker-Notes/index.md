---
title: Docker Notes
date: 2017-03-04
---
# Introduction
Container engine eliminates overhead of multiple instances of Guest OS in a hypervisor-based model; wasted resources. Containers share the OS.

Container virtualisation:
- Cost-efficient
- Fast deployment
- Portability

# Docker Client-Server Architecture
- Uses a client-server architecture with a docker daemon – controlled via Docker Client (command line or GUI like kidmatic)
- Daemon does heavy lifting. Referred to as server
- Docker client can also connect to a remote docker daemon
- Daemon can’t run on non-Linux platforms because natively it uses Linux specific kernel features
    - On OS X or Windows you run on a Docker machine which involves a lightweight Linux VM to run the daemon
- Docker daemon is referred to as docker server or docker engine

# Installation
- Docker is easy to install 🙂 I am using Docker for Mac
- Docker for Windows/Mac is the preferred way to go. It runs as a native application and manages a Linux VM which as mentioned above is needed in order to run the Docker daemon. If you’re using Linux, you should install Docker natively on the box
- You can manage resources for Docker with the application
- Use docker info in the terminal

# Docker Toolbox
- Shutdown Virtual Box before running docker toolbox
- He pronounces it kidmatic, but actually it is Kitematic he talks about
- Docker QS is a docker client which takes commands and sends to docker daemon
- docker server refers to docker daemon
- If you open virtual box you will see in the background a machine has been set up there
- Once you have toolbox; access by QST

# Important Docker Concepts
- Images are read only templates used to create containers
  - created with the docker build command, either by us or other docker users
  - composed of layers of other images
  - stored in a docker registry (like docker hub)
- Containers: if an image is a class, then a container is an instance of a class (a runtime object)
  - lightwegith & portable encapsulations of an environment in which to run applications
  - we create a container from an image and then run the container
  - containers are created from images. Inside a container are all the binaries and dependencies needed to run the application (why they’re portable)
- Registries are where we store the images
  - Youc an host your own registry or use dockerhub (dockers public registry)
  - inside a registry, images are stored in repositories
- Docker repository is a collection of different docker images with the same name that have different tags, each tag usually will represent a different version of an image

# Docker Hub
- Public repo w/ large number of images to use
- Encouraged to use docker official images for projects – dedicated team review official repo’s – greater security with official images
- image specified by repository:tag

# My first container
![](terminal.png)
- docker images; checks for images in local box. Docker first checks locally for an image before attempting to get from public repo
- docker run; creates container using specific image, then spins up container and runs it
- as i found out by running the command quicker than the tutorial, I see I forgot to include command line to echo hello world. I just ran the same docker run command but included my command line. DOcker already knew I had the instance running locally and you see it issued the command to the already running box. You see performing docker images, it used existing container rather than spin up another. It is smart
- include ls command to see contents of container
- You can use interactive mode and enter the docker images console using the -i flag. The -i flag starts an interactive container. The -t flag creates a pseudo -TTY that attached stdin and stdout
- Once we exit a container, docker shuts down the container. If I run the same command again after exit, docker starts a brand new container, so you see performing ls again after making new file in the last container – it is no longer there bc it is new container

# Deep dive into Docker containers
- Interactive mode puts the container in the foreground, previously before entering -i -t, we were in the background (detached)
- Find running containers using docker ps
- Find all containers, including previous ones with docker ps -a (-a is all)
- Including –rm means Docker will remove the container once it is done
- Use docker –name text, flag to give the container a name. If you don’t docker automatically will give a name
- docker inspect displays low level information about a container image. outputted as json

# Docker port mapping and docker logs
- docker run -it -p 8888:8080;  8888 port on docker container and 8080 on host machine (my laptop)
- exit container using ctrl + c; this kills the container – no longer running tomcat!
- Adding -d (detached) to the container start up used previously does everything in the background – tomcat is running again and we just get given a container ID
- See the logs of running container using; docker logs containerId
- Format for port mapping in Docker run command is host_port:container_port

# Docker image layers
- image layers stacked to contain base for base image file system
- layer below is the parent image
- when we create a new container, we add a new thin writeable layer on top of underlying image layers
- a docker image is made up of a list of read-only layers that represent file system differences
- image very bottom is base image
- see full set of layers in image using docker history busybox:1.24
- docker includes a thin writeable container layer where all changes to running container are written to this writeable layer
- when container is deleted, writeable layer is also deleted but underlying image remains unchanged
- multiple containers can share access to same underlying image yet keep their own changes on the writeable layer

# Build Docker images
- 2 ways: commit changes made in a docker container, or write a dockerfile to build an image
- commit our changes made in a container to build a docker image
- write a dockerfile to build an image
- I used the debian:jessie image in a container. I installed git and exited. I saved this container to my own repository

# Writing a Dockerfile
- A dockerfile is a text document that contains all the instrucitons users provide to asemble an image
- each instruction will create a new image layer to the image
- instructions specify what to do when building the image
- docker build command takes the path to the build context as an argument
- when build starts, docker client would pack all the files in the build context into a tarball then transfer the tarball file to the daemon (because remember the daemon could be running on a remote machine)
- by default, docker would search for the Dockerfile in the build context path
- After step 2 docker created new container based on previous and committed, does the same on next step removing previous
