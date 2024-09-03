#!/bin/bash

container="directus"

if [ -z $1 ]; then
    echo "Please provide a snapshot date. Example: 2024_01_01"
    exit 1
fi
echo snapshot_$1.yml

docker cp snapshot_${$1}.yml directus:/tmp/snapshot.yml
docker exec -t $container npx directus schema apply --yes /tmp/snapshot.yml

