# gw-landingpage

## Getting started / Installation

### Nuxt app

- Vorraussetungen: Node & npm sind installiert. (npm > 7 wegen lockfile version = 2)
- Nuxt app installieren:

```bash
# install dependencies
$ npm install
```

- .env File (in project root bzw. wpgwn-landingpage/.env) anlegen & Variablen eintragen:

```
DIRECTUS_URL=http://localhost:8055
DIRECTUS_EMAIL=***REMOVED***
DIRECTUS_PASSWORD=***REMOVED***
DIRECTUS_STATIC_TOKEN=

MATOMO_SITE_ID=999
APP_URL=http://localhost:4200
```

- Nuxt app starten:

```bash
# serve with hot reload at localhost:3000
$ npm run dev
```

### Directus mit Postgres

- Directus & Postgres installieren:

```bash
docker-compose up -d
```

- Datenbank Dump einspielen:

```bash
cat [DB_DUMP_FILE].sql | docker exec -i database psql -U directus -d directus
```

- Dateien/Assets in das directus uploads Verzeichnis (wpgwn-landingpage/.directus/uploads/) kopieren:

```bash
 cp [FILES_DUMP_FOLDER]/* .directus/uploads/
```

- Directus & Postgres starten:

```bash
docker-compose up -d
```

## Build Docker Image

```bash
docker build . -t nuxt-lp
```

## Directus

### Richt Text Editor Anpassungen

Für den RTE gibt es custom Controls um die Bilder positionieren zu können und deren Größe zu beeinflussen: /directus/rte-config.json

Das JSON muss für jeden RTE der dieses Feature unterstützen soll, im Directus für das Feld unter Benutzeroberfläche -> Benutzerdefinierte Formate hinzugefügt werden

### Data migration to different environment

#### Backup: DB-Dump & Dateien/Assets-Dump erstellen

```bash
# Create DB Dump from database container
docker exec -t database pg_dump -c -U directus > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
# Copy uploads directory from docker container to local directory
docker cp directus:directus/uploads /host/path/target
```

#### Restore: DB-Dump & Dateien/Assets-Dump einspielen

```bash
# Restore dump into database container
cat dump_dev_13-06-2022_09_29_43.sql | docker exec -i database psql -U directus -d directus
# Copy uploads local directory to docker container
docker cp /host/path/source/. directus:/directus/uploads
docker exec -u root  directus chown -R node:node /directus/uploads
```

### Schema migration to different environment

See [Schema Migration documention](https://docs.directus.io/reference/cli/#migrate-schema-to-a-different-environment) for details.

#### Export current schema:

```bash
# Save snapshot in docker container
docker exec -t directus npx directus schema snapshot /tmp/snapshot.yml
# Copy file to local directory
docker cp directus:/tmp/snapshot.yml snapshot.yml
```

#### Apply schema

Run the following command to apply the schema snapshot to directus installation:

```bash
# Copy the file in the docker container
docker cp snapshot.yml directus:/tmp/snapshot.yml

# Apply schema
docker exec -t directus npx directus schema apply --yes /tmp/snapshot.yml

```

### Downgrade directus

```bash
docker exec -t directus npx directus database migrate:latest
```

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
