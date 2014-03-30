module.exports = function(grunt) {

  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

// SETUP:

    bowercopy: {
        options: {
            // Bower components folder will be removed afterwards
            clean: true
        },
        boilerplate: {
            files: {
              'assets/sass': 'sass-structure'
            }
        },
    },

// CSS:

    sass: {
      dist: {
        options: {
          // cssmin will minify later
          style: 'expanded'
        },
        files: {
          'public/css/global.css': 'assets/sass/main.sass'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 10 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'public/css/global.css',
        dest: 'public/css/'
      }
    },
    cssc: {
      csscFirstSet: {
        files: {
          'public/css/global.css': 'public/css/global.css'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/css/global.css': ['public/css/global.css'],
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: false
        },
        files: {
          'public/index.html': 'public/index.html',
        }
      },
    },

// JAVASCRIPT:

    concat: {
      dist: {
        src: [
          'assets/js/lib/*.js',
          'assets/js/vendor/*.js',
          'assets/js/main.js'
        ],
        dest: 'public/js/main.js'
      }
    },
    uglify: {
      build: {
        src: 'public/js/main.js',
        dest: 'public/js/main.js'
      }
    },

// IMAGES:

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/images/'
        }]
      }
    },

// OTHER:

    livereload: {
      options: {
        base: 'public',
      },
        files: ['public/css/global.css', 'public/*.html']
    },
    connect: {
      server: {
        options: {
          hostname: '192.168.1.119',
          port: 9008,
          base: 'public/',
          keepalive: true,
        }
      }
    },

// HAML
    haml: {
      dist: {
        files: {
          'public/index.html': 'assets/index.haml'
        }
      },
    },
    modernizr: {

        dist: {
            // [REQUIRED] Path to the build you're using for development.
            "devFile" : "public/js/vendor/modernizr-2.6.2.min.js",

            // [REQUIRED] Path to save out the built file.
            "outputFile" : "assets/js/vendor/modernizr-custom.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : true,
                "printshiv" : false,
                "load" : true,
                "mq" : false,
                "cssclasses" : true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : false,
                "teststyles" : false,
                "testprops" : false,
                "testallprops" : false,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false
            },

            // By default, source is uglified before saving
            "uglify" : true,

            // Define any tests you want to implicitly include.
            "tests" : [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            "files" : {
                "src": ['assets/sass/main.sass', 'assets/js/main.js']
            },

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
        }

    },
// WATCH
    watch: {
      haml: {
        files: ['public/index.html', 'assets/index.haml'],
        tasks: ['haml', 'modernizr', 'htmlmin'],
        options: {
          spawn: false,
          livereload: true,
        }
      },
      css: {
        files: ['assets/sass/*.sass', 'assets/sass/**/*.sass', 'assets/sass/*.scss', 'assets/sass/**/*.scss'],
        tasks: ['sass', 'cssc', 'autoprefixer'],
        options: {
          spawn: false,
          livereload: true,
        }
      },
      scripts: {
        files: ['assets/js/*.js'],
        tasks: ['modernizr', 'concat', 'uglify'],
        options: {
          spawn: false,
          livereload: true,
        }
      },
    },
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['sass', 'autoprefixer', 'modernizr', 'concat', 'modernizr', 'uglify', 'imagemin', 'haml', 'htmlmin', 'cssc', 'cssmin']);
  grunt.registerTask('setup', ['bowercopy']);
  grunt.registerTask('dev', ['watch']);

};