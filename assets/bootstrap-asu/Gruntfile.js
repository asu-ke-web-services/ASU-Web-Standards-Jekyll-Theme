module.exports = function (grunt) {
  'use strict';

  var customLaunchers = {
    'PhantomJS_Mobile': {
      base: 'PhantomJS',
      options: {
        windowName: 'ASU Bootstrap Tests',
        viewportSize: {
          width : 765,
          height: 1000
        }
      }
    },
    'PhantomJS_Desktop': {
      base: 'PhantomJS',
      options: {
        windowName: 'ASU Bootstrap Tests',
        viewportSize: {
          width: 1500,
          height: 1000
        }
      }
    }
  };

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= props.license %> */\n',
    // =======
    // JS Hint
    // =======
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      core: {
        src: [
          'js/*.js',
          '!js/_vendor.js'
        ]
      }
    },
    // ===============
    // JS Coding Style
    // ===============
    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      core: {
        src: '<%= jshint.core.src %>'
      }
    },
    // Karma
    // =====
    karma: {
      unit: {
        options: {
          files: ['test/qunit/unit/*.js']
        }
      },
      coverageMobile: {
        frameworks: ['qunit'],
        reporters: ['coverage'],
        preprocessors: {
            "js/*.js": "coverage"
        },
        coverageReporter: {
            type: "lcov",
            dir: "coverage/"
        },
        plugins: ['karma-qunit', 'karma-phantomjs-launcher', 'karma-coverage'],
        files: [
          { src : ['test/vendor/js/jquery-1.11.2.min.js'], served: true },
          { src : ['test/vendor/js/bootstrap.min.js'], served: true },
          { src : ['test/qunit/unit/_qunit-fixture.js'], served: true },
          { src : ['<%= concat.bootstrapAsu.src %>'], served: true },
          { src : ['test/qunit/unit/*-test.js'] }
        ],
        singleRun: true,
        browsers: ['PhantomJS_Mobile', 'PhantomJS_Desktop'],
        customLaunchers: customLaunchers
      },
      //continuous integration mode: run tests once in PhantomJS browser.
      continuousMobile: {
        frameworks: ['qunit'],
        plugins: ['karma-qunit', 'karma-phantomjs-launcher'],
        files: [
          { src : ['test/vendor/js/jquery-1.11.2.min.js'], served: true },
          { src : ['test/vendor/js/bootstrap.min.js'], served: true },
          { src : ['test/qunit/unit/_qunit-fixture.js'], served: true },
          { src : ['<%= concat.bootstrapAsu.src %>'], served: true },
          { src : ['test/qunit/unit/*-test.js'] }
        ],
        singleRun: true,
        browsers: ['PhantomJS_Mobile', 'PhantomJS_Desktop'],
        customLaunchers: customLaunchers
      }
    },
    // QUnit
    // =====
    qunit: {
      options: {
        inject: 'test/qunit/phantom.js',
        // size the viewport for mobile
        page : {
          viewportSize : {
            width : 766
          }
        }
      },
      files: [
        'test/qunit/qunit-index.html'
      ]
    },
    // SCSS Lint
    // =========
    scsslint: {
      allFiles: [
        'scss/*.scss',
        'scss/mixins/*.scss',
        'scss/theme/*.scss',
        'scss/navigation/*.scss',
        'scss/variables/*.scss',
        // Not font_awesome
      ],
      options: {
        config: 'scss/.scss-lint.yml'
      }
    },
    // SASS Compile
    // ============
    sass: {
      options: {
        style: 'expanded',
        sourcemap: 'auto'
      },
      dist: {
        files: {
          'build/css/bootstrap-asu.css' : 'scss/bootstrap-asu.scss'
       }
      },
      fortesting: {
        files: {
          'test/vendor/css/bootstrap-asu.css' : 'scss/bootstrap-asu.scss',
        }
      }
    },
    // JS Compile
    // ==========
    concat: {
      bootstrapAsu: {
        src: [
          'js/_license.js',
          'js/_vendor.js',
          'js/_modernizr.js',
          'js/_iframe-overlay.js',
          'js/_smoothscroll.js',
          'js/_smartresize.js',
          'js/_calendar.js',
          'js/_sidebar.js',
          'js/_collapse-footer.js',
          'js/_wait-for.js',
          'js/_mobile-menu.js',
          'js/_sticky-nav.js',
          'js/_navs-click-and-hover.js'
        ],
        dest: 'build/js/bootstrap-asu.js'
      },
      kss : {
        src: [
          'test/vendor/css/bootstrap.min.css',
          'test/vendor/css/bootstrap-asu.css',
        ],
        dest: 'build/docs/all.css'
      }
    },
    // JS Uglify
    // =========
    uglify: {
      options: {
        preserveComments: 'some',
        sourceMap: true
      },
      core: {
        src: 'build/js/bootstrap-asu.js',
        dest: 'build/js/bootstrap-asu.min.js'
      }
    },
    // CSS Minify
    // ==========
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
          ext: '.min.css'
        }]
      }
    },
    // Browser Sync
    // ============
    browserSync: {
      bsFiles: {
        src : [
          '<%= watch.core.files %>',
          './test/vendor/css/*.css'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./",
          index: "test/qunit/visual-index.html"
        }
      }
    },
    // Watch
    // =====
    watch: {
      core: {
        files: ['<%= jshint.core.src %>', '<%= scsslint.allFiles %>'],
        tasks: [
          'test'
        ]
      }
    },
    // KSS
    // ===
    kss : {
      options: {
        css: [
          'all.css'
        ],
        template: 'template'
      },
      dist: {
        files: {
          'build/docs' : ['scss']
        }
      }
    },
    // Grunt Bower
    // ===========
    bower: {
      dev: {
        dest: './build/',
        options: {
          keepExpandedHierarchy: false,
          packageSpecific: {
            'font-awesome': {
              fonts_dest: './build/fonts',
              files: [
                'fonts/*'
              ]
            }
          }
        }
      }
    }
  });


  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-bower');

  grunt.registerTask('validate', [
    'jshint',
    'jscs',
    'scsslint',
  ]);

  grunt.registerTask('test-base', [
    'sass:fortesting',
    'karma:continuousMobile',
    'qunit',
  ]);

  grunt.registerTask('build', [
    'sass:dist',
    'concat',
    'uglify',
    'cssmin',
    'bower',
  ]);

  // Documentation
  grunt.registerTask('docs', [
    'validate',
    'sass:fortesting',
    'concat:kss',
    'kss'
  ]);

  // Serve
  grunt.registerTask('serve', [
    'browserSync',
    'watch:core'
  ]);

  // Just Test
  grunt.registerTask('test',  [
    'validate',
    'test-base',
    'karma:coverageMobile',
  ]);

  // Default task
  grunt.registerTask('default', [
    'validate',
    'test-base',
    'build',
    'docs',
  ]);
};
