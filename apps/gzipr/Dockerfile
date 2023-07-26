# use alpine linux as our 'base' image
FROM alpine:edge as base

# install os dependencies
RUN apk add --no-cache --virtual .node-deps \
  nodejs \
  yarn \
  curl \
  tini

# set current directory
WORKDIR /app

# create 'base' entrypoint
ENTRYPOINT [ "/sbin/tini", "--" ]

# use 'deps' image to install app dependencies
FROM base AS deps

# copy app binaries
COPY dist/apps/gzipr .

# set current directory
WORKDIR /app

# install dependencies
RUN yarn install --production --silent

# use 'base' image to create our 'runtime' image
FROM base AS runtime

# set current directory to root folder
WORKDIR /

# create user 'gziprd' with uid 1000
RUN adduser -D -s /bin/ash gziprd 
# RUN adduser -D -s /bin/ash gziprd -u 1000

# remove app binaries from '/app'
RUN rm -rf /app

# create the 'uploads' directory and change ownership to 'gziprd'
RUN mkdir -p /home/gziprd/app/uploads && chown gziprd:gziprd /home/gziprd/app/uploads

# set current directory to our user folder
WORKDIR /home/gziprd/app

# copy our app binaries
COPY --chown=gziprd:gziprd --from=deps /app/package.json .
COPY --chown=gziprd:gziprd --from=deps /app .

# install process manager
RUN yarn global add pm2 --silent

# expose ports
EXPOSE 3000

# execute process from user 'gziprd'
USER gziprd

# configure container self healthcheck
HEALTHCHECK --interval=60s --timeout=5s CMD curl -f http://localhost:3000/status || exit 1

# run process 'gzipr' in cluster mode with an exponential backoff on restart
CMD [ "pm2-runtime", "main.js", "--name", "gzipr", "-i", "max", "--cron-restart", "0 0 * * *" ]