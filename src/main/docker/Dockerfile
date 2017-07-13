FROM zlp11313.vci.att.com:5100/com.att.ajsc.public/anapsix/alpine-java:8_jdk
VOLUME /tmp
ADD salesexpressmsuidemo.jar app.jar
VOLUME /etc
ADD /etc/ /etc/
ADD startService.sh /startService.sh
RUN chmod 700 /startService.sh
ENTRYPOINT ./startService.sh 
