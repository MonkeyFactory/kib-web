#!/bin/sh

DSTDIR="/home/kib/www/"
WORKINGDIR="/home/kib/kib-web-post-deploy-working-folder"

mkdir $WORKINGDIR; cd $WORKINGDIR 

tar xzf ../deploy.tar.gz

#PATCHING
echo "[log] Patching started"

#Update API path
sed -i 's|kibdev.crabdance.com|konfliktspeliborlange.se|' pageroot/dist/scripts/*.js

#Find name of current app CSS
cssname=$(cd pageroot/dist; ls styles/app-*.css | head -n 1)
echo "[log] Current app CSS is - $cssname"

#Update path for the page css files
cd "$WORKINGDIR/forum-theme/kib/theme"
sed -i "s|/\* KiB-Styles \*/|@import url("../../../$cssname");|" stylesheet.css 

#COPY TO SRCDIR
echo "[log] Copying main web page files"
cp -r $WORKINGDIR/pageroot/dist/* "$DSTDIR"

echo "[log] Copying forum theme"
[ ! -d "$DSTDIR/forum/styles/" ] && mkdir -p "$DSTDIR/forum/styles/"
cp -r "$WORKINGDIR/forum-theme/kib" "$DSTDIR/forum/styles/"

cd ../
#rm -rf $WORKINGDIR