FROM node:16-alpine3.15 AS build

WORKDIR /usr/src/app
COPY . .

# RUN npm config set registry http://registry.npm.taobao.org/
# RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn
RUN yarn run build

FROM nginx
COPY --from=build /usr/src/app/dist/home-web /usr/share/nginx/html/
