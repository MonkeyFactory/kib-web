FROM ubuntu
RUN apt-get update && apt-get install php5 php5-mysql php5-json wget -y
RUN wget -q -O - "https://www.phpbb.com/files/release/phpBB-3.1.6.tar.bz2" | tar xjf -
ADD startup.sh /startup.sh
EXPOSE 8000
CMD bash /startup.sh