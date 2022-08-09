FROM node:16-alpine as TEMP_BUILD_IMAGE
WORKDIR /app
COPY . .
RUN yarn config set strict-ssl false
RUN yarn install
RUN yarn run build

FROM nginx:1.23.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=TEMP_BUILD_IMAGE /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]