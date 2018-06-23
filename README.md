gios-asu.github.io
==================
[![Build Status](https://travis-ci.org/gios-asu/ASU-Web-Standards-Jekyll-Theme.svg?branch=master)](https://travis-ci.org/gios-asu/ASU-Web-Standards-Jekyll-Theme)

ASU Web Standards Jekyll Theme.


## Jekyll

This repository uses Jekyll for a file based CMS.  GitHub IO pages support Jekyll automatically, so no set up is required.

For more about Jekyll, checkout https://github.com/jekyll/jekyll.

For more about Jekyll with Pages, checkout https://help.github.com/articles/using-jekyll-with-pages/.


## Getting started developing these pages locally:

We recommend using the provided Docker setup to launch this site in a builder container that monitors all changes to the project files and re-renders that site as needed, plus serves the rendered site on http://localhost

Make sure you have a recent version of Docker CE installed on your computer, including the docker-compose utility.

Launch the builder container:

````
docker-compose up
````

The compiled website will be saved into the `_site/` folder.

Preview your compiled website at: `http://localhost`
