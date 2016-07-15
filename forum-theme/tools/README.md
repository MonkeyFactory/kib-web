# Forum theme development tools

This folder contains tools to build a docker image running phpBB 3.1, which will be useful to maintain the kib forum-theme.

To build the image and download all the required files use *docker-compose* from this directory.

```
docker-compose up
```

**Port**: 8000   
**Database**: phpbb   
**DB User**: root   
**DB Pass**:    
**Volume**: /www   

On Linux machines symlinking the theme directory into *www/styles/* is a tip!
