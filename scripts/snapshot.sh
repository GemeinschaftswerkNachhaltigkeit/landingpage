#!/bin/bash
docker exec -t directus npx directus schema snapshot /tmp/snapshot.yml
docker cp directus:/tmp/snapshot.yml snapshot.yml
today=$(date +"%Y_%m_%d")
cp snapshot.yml snapshots/snapshot_${today}.yml

