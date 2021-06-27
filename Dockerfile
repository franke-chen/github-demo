FROM nginx
COPY ./dist/hello-world-angular/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo "message from hello world angular"
