FROM node:lts-alpine as builder

# create destination directory
RUN mkdir -p /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app
COPY . .

# dont include dev dependencies in docker image. They are only needed for the release.
# RUN npm ci --ignore-scripts && npm install --save-dev esbuild@0.13.4
RUN npm ci --ignore-scripts

FROM node:lts-alpine

WORKDIR /usr/src/nuxt-app

COPY --from=builder /usr/src/nuxt-app  .

ENV NODE_ENV production
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV PORT 8000

ENV HOST 0.0.0.0
EXPOSE 8000

# build necessary, even if no static files are needed,
# since it builds the server as well

# build and start the app
CMD [ "sh", "-c", "npm run build && node .output/server/index.mjs" ]
