ASU Web Standards Bootstrap
===========================

[![Travis](http://img.shields.io/travis/gios-asu/ASU-Web-Standards-Bootstrap.svg?style=flat)](https://travis-ci.org/gios-asu/ASU-Web-Standards-Bootstrap)
[![Code Climate](http://img.shields.io/codeclimate/github/gios-asu/ASU-Web-Standards-Bootstrap.svg?style=flat)](https://codeclimate.com/github/gios-asu/ASU-Web-Standards-Bootstrap) 
[![Stories in Ready](https://badge.waffle.io/gios-asu/asu-web-standards-bootstrap.svg?label=issues-ready&title=Issues+Ready)](http://waffle.io/gios-asu/asu-web-standards-bootstrap)

[![Github release](https://img.shields.io/github/release/gios-asu/ASU-Web-Standards-Bootstrap.svg?style=flat)](https://github.com/gios-asu/ASU-Web-Standards-Bootstrap/releases)
[![Github issues](https://img.shields.io/github/issues/gios-asu/ASU-Web-Standards-Bootstrap.svg?style=flat)](https://github.com/gios-asu/ASU-Web-Standards-Bootstrap/issues)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat)](https://github.com/gios-asu/ASU-Web-Standards-Bootstrap/blob/master/LICENSE.md) [![Analytics](https://ga-beacon.appspot.com/UA-561868-49/gios-asu/ASU-Web-Standards-Bootsrap?flat)](https://github.com/igrigorik/ga-beacon)

[View the Visual Documentation](http://gios-asu.github.io/ASU-Web-Standards-Bootstrap)

This ASU Web Standards Bootstrap repo provides stylesheets and JavaScript that are consistent with the new [ASU Web Standards](http://hub.asu.edu) being rolled out to the school websites at [ASU](https://asu.edu). The intent of this *Bootstrap add-on* is to provide a universal source for the ASU Web Standards that can be applied to any website, regardless of what technology is used to build a site. This project is based off of the work done by [29thDrive](http://asu-ws.29thdrive.com/) and is consistent with their initial work. This repository is maintained by the [Julie Ann Wrigley Global Institute of Sustainability](http://sustainability.asu.edu).

This project does not replace Twitter Bootstrap, but rather adds files that extend Bootstrap.  You still need to include the latest Bootstrap files in your website.

For Web Standards documentation, checkout [The Hub](http://hub.asu.edu).

# Table of Contents

- [Dependencies](#dependencies)
- [Quick start](#quick-start)
- [Theme Details](#theme-details)
- [Developers](#developers)
- [Developer Workflow](#developer-workflow)
- [Related Projects](#related-projects)
- [Other Implementations of the ASU Web Standards](#other-implementations-of-the-asu-web-standards)

# Dependencies

The following must be added to your website in order to use the ASU Web Standards Bootstrap files:

- [Twitter Bootstrap](http://getbootstrap.com/) - Required
- [jQuery](http://jquery.com/) - Required
- [ASU Header](https://drupal.asu.edu/build/asu-header-footer-version-40) - Recommended for University Websites
- [RespondJS](https://github.com/scottjehl/Respond) - to make media queries work on 
IE 6-8 - Optional
- [Lightning Touch](https://github.com/ucsf-ckm/LightningTouch) - makes links responsive without the several hundred millisecond delay typical in a hendheld touchscreen browser - Optional

The following are bundled into the ASU Web Standards Bootstrap files for your convenience:

- [Modernizr](http://modernizr.com/)
- [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
- [Moment JS](http://momentjs.com/) - Used for calendar ICS files.


# Quick Start

You can use one of the following ways to use this repo:

- [Download the latest release](https://github.com/gios-asu/ASU-Web-Standards-Bootstrap/releases).
- Clone the repo: `git clone https://github.com/gios-asu/ASU-Web-Standards-Bootstrap.git`.

The files that you should include in your website are the ones in `/build`.

Add the following to your head (after your stylesheets for Bootstrap):

```html
<!-- ASU Bootstrap Standards -->
<link href="/css/bootstrap-asu.css" rel="stylesheet">
```

Add the following to the end of your `<body>` before the closing `</body>` tag, but after your other script tags:

```html
<!-- ASU Bootstrap Standards -->
<script src="./js/bootstrap-asu.min.js"></script>
```

Please remember to include all of the [dependencies](#dependencies).  Include all 3rd party stylesheets and scripts BEFORE including the stylesheets and scripts provided in this repo.

For developers or when debugging, consider using the non-minified JavaScript files and adding the `*.map` files to where your `*.css` files are.

## Favicons

Favorite Icons are provided in the `build/img/favicon` folder, below is some sample HTML that you should include
in your `<head>`. Be sure to adjust the path to match their location on your site.

```html
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="img/favicon/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/favicon/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/favicon/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/favicon/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="img/favicon/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="img/favicon/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="img/favicon/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="img/favicon/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="img/favicon/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="img/favicon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="img/favicon/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="img/favicon/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="img/favicon/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="&nbsp;"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="img/favicon/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="img/favicon/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="img/favicon/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="img/favicon/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="img/favicon/mstile-310x310.png" />
```

# Theme Details

This theme uses [Font Awesome](http://fortawesome.github.io/Font-Awesome/).

Bootstrap natively provides [Glyphicons](http://getbootstrap.com/components/#glyphicons), which means both can be used in tandiem. The HUB documentation
recommends using Font Awesome icons.

This theme uses the Google Font Roboto.  If you do not include Roboto in your website using the instructions provided on [Google Font's website](http://www.google.com/fonts/specimen/Roboto), the font will default to 'Helvetica Neue', then Helvetica, then Arial, then the browser's default sans-serif font. It is recommended that you include the Normal, Light, and Bold version of the font:

```html
<link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'>
```

# Developers

For developers, the following details what tools we use and how we use them.

## Grunt

This repository uses grunt to:

- Check common JavaScript problems using JS Hint.
- Check JavaScript Coding Standards.
- Run QUnit Unit Tests.
- Check common SCSS problems.
- Compile SCSS into CSS.
- Compile all JS files into one file.
- Uglify the JS.

Run `grunt` from the root of the project and it will create files in the `/build` folder.  These files will get overwritten when grunt is run and they should never be modified directly. 

Note: currently, `/build/fonts/*` is not generated by grunt.  These are the only static files that you can modify without worrying about grunt overwriting them.

### Setting up your grunt work environment

Our grunt build requires Ruby and a few Ruby Gems for the SCSS compilation. Here are the steps to get set up and running with grunt:

0. Install [Node.js](http://nodejs.org/)
1. Run NodeJS and navigate to the root of the project
2. Install grunt and our grunt dependencies:

  - npm install -g grunt-cli
  - gem install sass
  - gem update --system
  - gem install scss-lint
  - npm install

3. Run grunt:
  - grunt

Grunt will lint the scss and js files, it will check JavaScript coding standards, run tests, and compile and minify all source files.

It is normal practice to run grunt and commit the results as an individual commit called "Gruntfile" or "Grunt task."

## Travis-CI

We use Travis-CI to make sure that the SCSS files and JS files are written correctly and compile correctly.  Our Travis-CI configurations are in .travis.yml and package.json.  It will run the grunt tasks described above.

[Checkout our Travis CI Page](https://travis-ci.org/gios-asu/ASU-Web-Standards-Bootstrap/builds)

## PhantomJS

Our tests are run on [PhantomJS](http://phantomjs.org/).  PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.

Note that PhantomJS can timeout during the visual tests if one of the page dependencies (like [Placeholdit](http://placehold.it/)) times out.

## Qunit

Our tests are written using [Qunit](http://api.qunitjs.com/).  It is a powerful, easy-to-use JavaScript unit test suite.

## Blanket JS

If you want to check the code coverage of the project, boot up a server (any server since the files are just HTML, but it is recommended to use Apache) and deploy `/test/*` to it.

Go to `/test/qunit/index.html` in the browser, and click the checkbox next to `Enable coverageModule: ...`. This will show you a code coverage report in the browser.

# Developer Workflow

1. Work and commit locally as normal.
2. Run `grunt test`.
3. Fix any problems that grunt displayed.
4. Commit locally, noting what fixes were made.
5. Run `grunt`.
6. Grunt should finish without any errors.
7. If grunt succeeded, make a commit with the message "grunt" or "Fix coding standards" if the changes are purely aesthetic.
8. Push upstream

If you are releasing a new version, make sure to:

1. Upversion any JavaScript files you changed.
2. Upversion `js/bootstrap-asu.js`
3. Upversion `scss/bootstrap-asu.scss`
4. Upversion `scss/bootstrap-asu-theme-base.scss`
5. Run `grunt`.
6. If grunt succeeded, make a commit with the message "grunt, upversioned".
7. Push upstream
8. Make a new release in Github.

# Related Projects

This project is being heavily used by:

- [ASU-Wordpress-Web-Standards-Theme](https://github.com/gios-asu/ASU-Wordpress-Web-Standards-Theme)
- [gios-asu.github.io](https://github.com/gios-asu/gios-asu.github.io)


# Other Implementations of the ASU Web Standards

- [ASU Webspark](https://brandguide.asu.edu/web-standards/webspark/) - Drupal 7 Distribution
- [ASU slimspark](https://drupal.asu.edu/resources/docs/modules/asu-slimspark) - Drupal 7 Stand alone Theme

