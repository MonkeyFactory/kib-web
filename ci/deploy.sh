#!/bin/sh

DISTDIR="../pageroot/dist"
FORUMTHEMEDIR="../forum-theme"
DISTARCHIVE="deploy.tar.gz"

tar czf $DISTARCHIVE $DISTDIR $FORUMTHEMEDIR/*

#Unpack keys
tar xf keys.tar

#Copy dist archive and post-deploy script
scp -i id_rsa -oStrictHostKeyChecking=no $DISTARCHIVE kib@konfliktspeliborlange.se:
scp -i id_rsa -oStrictHostKeyChecking=no "post-deploy.sh" kib@konfliktspeliborlange.se: