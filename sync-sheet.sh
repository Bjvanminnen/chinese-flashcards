#!/bin/bash

# TODO: could make this more resilient to any local changes

git pull
npm run pullchars
git add src/characters.json
git commit -m "Characters auto-update"
git push
