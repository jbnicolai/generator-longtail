var path = require('path');
var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        banner: '/*! <%%= pkg.name %> - v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>\nAuthor: <%%= pkg.author.name %> - <%%= pkg.author.email %> */\n',
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'app/build/',
                    hostname: '*',
                    livereload: true,
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            folderMount(connect, 'app/build')
                        ];
                    }
                }
            }
        },
        <% if (includeSCSS) { %>
        // process + minify SCSS into CSS
        sass: {
            development: {
                files: [{
                        src: "app/src/scss/main.scss",
                        dest: "app/src/css/styles.css"
                    } // add more files after here if needed
                ]
            }
        },<%  } else  { %>
        // process + minify LESS into CSS
        less: {
            development: {
                files: [{
                        src: "app/src/less/main.less",
                        dest: "app/src/css/styles.css"
                    } // add more files after here if needed
                ]
            }
        },<%  } %>
        // combine mediaqueries
        cmq: {
            multiple_files: {
                expand: true,
                src: 'app/src/css/*.css'
            }
        },
        // auto browserprefix for CSS
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            multiple_files: {
                expand: true,
                src: 'app/src/css/*.css'
            }
        },
        // minify CSS
        cssmin: {
            minify: {
                options: {
                    banner: '<%%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: 'app/src/css/',
                    src: ['*.css'],
                    dest: 'app/build/css/',
                    ext: '.min.css',
                    extDot: 'first'
                }]
            }
        },
        // minify and concat JS
        uglify: {
            site: {
                options: {
                    banner: '<%%= banner %>',
                    mangle: true,
                    beautify: false
                },
                files: {
                    'app/build/js/global.min.js': ['bower_components/jquery/dist/jquery.min.js', 'app/src/js/plugins.js', 'app/src/js/main.js']
                    // You can add additional JavaScript files into the above array, if you need to
                }
            },
            modernizr: {
                options: {
                    mangle: true,
                    beautify: false
                },
                files: {
                    'app/build/js/vendor/modernizr.js': ['bower_components/modernizr/modernizr.js']
                }
            }
        },<% if (includeJade) { %>
        // process jade
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/src/jade/',
                    src: ['*.jade'],
                    dest: 'app/build/',
                    ext: '.html',
                    extDot: 'first'
                }]
            }
        },<%  } %> 
        // optimize images
        imagemin: {
            dist: {
                expand: true,
                cwd: 'app/src/img/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: 'app/build/img/'
            }
        },
        // watch for changes in files
        watch: {
            // watch for change in grunt file then reload if necessary
            configFiles: {
                files: ['Gruntfile.js'],
                tasks: [<% if (includeSCSS) { %>'sass', <% } else { %> 'less', <% } %>'cmq', 'autoprefixer', 'cssmin', 'uglify', 'newer:imagemin', <% if (includeJade) { %>'jade' <% } %>],
                options: {
                    reload: true
                }
            },
            // watch for changes in CSS
            styles: {
                files: [<% if (includeSCSS) { %>"app/src/scss/*.scss", <% } else { %> "app/src/less/*.less" <% } %>],
                tasks: [<% if (includeSCSS) { %>'sass', <% } else { %> 'less', <% } %> 'cmq', 'autoprefixer', 'cssmin'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for changes in script
            scripts: {
                files: ['app/src/js/*.js'],
                tasks: ['uglify:site'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for updates in images
            images: {
                files: ['app/src/img/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },<% if (includeJade) { %>
            jades: {
                files: ['app/src/jade/**/*.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },<% } %>
            // watch for updates in html
            html: {
                files: ['app/build/*.html', 'app/build/templates/*.html'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');<% if (includeSCSS) { %>
    grunt.loadNpmTasks('grunt-contrib-sass');<% } else { %>
    grunt.loadNpmTasks('grunt-contrib-less');<% } %>
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-newer');<% if (includeJade) { %>
    grunt.loadNpmTasks('grunt-contrib-jade');<% } %>

    // Default task(s).
    grunt.registerTask('default', [<% if (includeSCSS) { %>'sass', <% } else { %> 'less', <% } %>'cmq', 'autoprefixer', 'cssmin', 'uglify', 'newer:imagemin', <% if (includeJade) { %>'jade', <% } %>'connect', 'watch']);

};
