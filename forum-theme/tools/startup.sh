#!/bin/sh

[ ! -d /www ] && mkdir /www

if [ -z "$(ls /www)" ]; then
	cd /phpBB3
	cp -r * /www
fi

php -S 0.0.0.0:8000 -t /www