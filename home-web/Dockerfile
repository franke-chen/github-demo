FROM node:16-alpine3.15 AS build

WORKDIR /usr/src/app
COPY . .

# COPY package.json ./
# COPY cloud77-angular-0.0.1.tgz ./

# RUN npm config set registry http://registry.npm.taobao.org/
# RUN npm install

RUN yarn
RUN yarn run build
RUN echo "complete build stage"

FROM nginx
COPY --from=build /usr/src/app/dist/home-web /usr/share/nginx/html/
RUN echo "complete run stage"

RUN echo "Complete building Cloud77 Home Web Image"
