FROM node:13.13 as node

ARG ENVIRONMENT=dev

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

#RUN npm run build
RUN npm run build:$ENVIRONMENT

FROM nginx:1.17.10
ENV API_BASE_URL="http://api-url"
# Copy files
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/onboardingui /usr/share/nginx/html
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx  /usr/share/nginx/html
COPY replace_api_url.sh /
EXPOSE 8080

CMD ["sh", "replace_api_url.sh"]
