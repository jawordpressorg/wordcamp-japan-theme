#!/usr/bin/env bash

set -e


if [[ "false" != "$TRAVIS_PULL_REQUEST" ]]; then
	echo "Not deploying pull requests."
	exit
fi

if [[ "develop" != "$TRAVIS_BRANCH" ]]; then
	echo "Not on the 'master' branch."
	exit
fi

git clone -b master --quiet "https://github.com/${TRAVIS_REPO_SLUG}.git" master
cp -R ./css/*.css ./master/css/
cp style.css ./master/
cp *.php ./master/
cd master
git add .
git commit -m "[ci skip] Update from travis $TRAVIS_COMMIT"
git push --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master 2> /dev/null
