#!/bin/bash

git pull
git stash
npm run pullchars
git add src/characters.json
git commit -m "Characters auto-update"
git push
git stash pop
