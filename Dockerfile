
FROM debian:stretch-slim

# Install exim4
ENV DEBIAN_FRONTEND noninteractive
RUN set -ex; \
  apt-get update; \
  apt-get install -y exim4-daemon-light; \
  apt-get clean

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
EXPOSE 25/tcp
ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD [ "exim", "-bdf", "-v", "-q30m" ]

FROM node:12.10.0 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:12.10.0
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
