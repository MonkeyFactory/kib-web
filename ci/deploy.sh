#!/bin/sh

DISTDIR="pageroot/dist"
FORUMTHEMEDIR="forum-theme"
DISTARCHIVE="deploy.tar.gz"

tar xzf $DISTARCHIVE $DISTDIR $FORUMTHEMEDIR/*

#Unpack keys
tar xf keys.tar

#Copy dist archive and post-deploy script
scp -i id_rsa $DISTARCHIVE kib@konfliktspeliborlange.se:
scp -i id_rsa "ci/post-deploy.sh" kib@konfliktspeliborlange.se: