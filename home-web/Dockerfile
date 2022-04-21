FROM node:16-alpine3.15 AS build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-ci
RUN echo "complete build stage"

FROM nginx
COPY --from=build /usr/src/app/dist/home-web /usr/share/nginx/html/
RUN echo "complete run stage"

RUN echo "Complete building Cloud77 Home Web Image"
