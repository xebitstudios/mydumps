FROM zlp11313.vci.att.com:5100/com.att.ajsc/node:boron-alpine

ARG HTTP_PROXY_URL

ENV DEFAULT_HTTP_PROXY_URL  http://one.proxy.att.com:8080

ENV HTTP_PROXY ${HTTP_PROXY_URL:-${DEFAULT_HTTP_PROXY_URL}}
ENV HTTPS_PROXY ${HTTP_PROXY_URL:-${DEFAULT_HTTP_PROXY_URL}}
ENV NO_PROXY .att.com

ENV PORT 8080

COPY . /app/

WORKDIR /app/

RUN npm -g set registry http://jldv0007.jadc.att.com:8093/nexus/repository/npm-proxy

RUN npm i

EXPOSE 8080

CMD [ "node", "/app/AnscRunner.js" ]
