#/bin/bash

#Include configuration if present
[ -f "config.sh" ] && source "config.sh"

if [ -z "$WEBROOT" ]; then
	echo "Please set the $WEBROOT env and run the script again";
	exit 1;
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Current path is $DIR"
echo "Copying to $WEBROOT"

cp -r "$DIR/page-root/*" "$WEBROOT"

echo "Copying forum theme"
cp -r "$DIR/forum-theme/*" "$WEBROOT/forum/styles/"