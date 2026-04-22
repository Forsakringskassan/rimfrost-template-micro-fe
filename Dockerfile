# Stage 1: Build the Vite application
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Apache HTTP Server and inject runtime environment variables
FROM httpd:latest

USER 0

RUN rm -rf /usr/local/apache2/htdocs/*

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/
COPY env.sh /usr/local/bin/env.sh

RUN chmod +x /usr/local/bin/env.sh && \
    sed -i 's/\r$//' /usr/local/bin/env.sh

ARG NEXT_VERSION
ARG GIT_COMMIT
ARG IMAGE_NAME
ARG BUILD_DATE
ENV NEXT_VERSION=$NEXT_VERSION
ENV GIT_COMMIT=$GIT_COMMIT
ENV IMAGE_NAME=$IMAGE_NAME
ENV BUILD_DATE=$BUILD_DATE

ENV HTTPD_PORT=8080

RUN mkdir -p /tmp/apache2/logs /tmp/apache2/run && \
    chown -R www-data:www-data /usr/local/apache2/htdocs /tmp/apache2 && \
    chmod -R 755 /usr/local/apache2/htdocs && \
    chmod -R 777 /tmp/apache2

RUN echo '#!/bin/bash' > /usr/local/bin/start-httpd.sh && \
    echo '/usr/local/bin/env.sh' >> /usr/local/bin/start-httpd.sh && \
    echo 'PORT=${HTTPD_PORT:-8080}' >> /usr/local/bin/start-httpd.sh && \
    echo 'cp /usr/local/apache2/conf/httpd.conf /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    echo 'sed -i "s/Listen 80/Listen $PORT/" /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    echo 'sed -i "s|ErrorLog logs/error_log|ErrorLog /tmp/apache2/logs/error_log|" /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    echo 'sed -i "s|CustomLog logs/access_log|CustomLog /tmp/apache2/logs/access_log|" /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    echo 'sed -i "s|#PidFile logs/httpd.pid|PidFile /tmp/apache2/run/httpd.pid|" /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    echo 'echo "PidFile /tmp/apache2/run/httpd.pid" >> /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    echo 'echo "ServerName localhost" >> /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    echo 'echo "Starting container: $IMAGE_NAME — Version: $NEXT_VERSION — Port: $PORT"' >> /usr/local/bin/start-httpd.sh && \
    echo 'httpd -D FOREGROUND -f /tmp/httpd.conf' >> /usr/local/bin/start-httpd.sh && \
    chmod +x /usr/local/bin/start-httpd.sh

USER www-data

EXPOSE $HTTPD_PORT

CMD ["/usr/local/bin/start-httpd.sh"]
