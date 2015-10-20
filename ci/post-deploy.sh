#!/bin/sh

DSTDIR="/home/kib/www/"
WORKINGDIR="~/kib-web-post-deploy-working-folder"

mkdir $WORKINGDIR; cd $WORKINGDIR 

tar xzf ../deploy.tar.gz

#PATCHING
echo "[log] Patching started"

#Update API path
sed -i 's|kibdev.crabdance.com|konfliktspeliborlange.se|' dist/scripts/app-*.js

#Find name of current app CSS
cssname=$(cd dist; ls styles/app-*.css | head -n 1)
echo "[log] Current app CSS is - $cssname"

#Update path for the page css files
cd "$WORKINGDIR/kib/theme"
sed -i "s|/\* KiB-Styles \*/.*?/\* -- \*/|@import url("../../../$cssname");|g" stylesheet.css 

#COPY TO SRCDIR
echo "[log] Copying main web page files"
cp -r WORKINGDIR/dist/* "$DSTDIR"

echo "[log] Copying forum theme"
[ ! -d "$DSTDIR/forum/styles/" ] && mkdir -p "$DSTDIR/forum/styles/"
cp -r "$WORKINGDIR/kib" "$DSTDIR/forum/styles/"