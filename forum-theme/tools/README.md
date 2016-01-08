# Forum theme development tools

This folder contains tools to build a docker image running phpBB 3.1, which will be useful to maintain the kib forum-theme.

To build the image and download all the required files use **docker-compose** from this directory.

```
docker-compose up
```

Port 8000 is used to access the webserver.

A local folder (volume) named *www* will be created in the current directory, this is mounted to the container and is used to actually change any of the files.

On *nix based machines symlinking the theme directory into 'www/styles/' is a tip!