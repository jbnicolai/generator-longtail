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
                    base: 'app/',
                    hostname: '*',
                    livereload: true,
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            folderMount(connect, 'app')
                        ];
                    }
                }
            }
        },
        // process + minify LESS into CSS
        less: {
            development: {
                files: [{
                        src: "app/css/main.less",
                        dest: "app/css/development/styles.css"
                    } // add more files after here if needed
                ]
            }
        },
        // auto browserprefix for CSS
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            multiple_files: {
                expand: true,
                src: 'app/css/development/*.css'
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
                    cwd: 'app/css/development/',
                    src: ['*.css'],
                    dest: 'app/css/build/',
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
                    'app/js/build/global.min.js': ['bower_components/jquery/dist/jquery.min.js', 'app/js/plugins.js', 'app/js/main.js']
                }
            },
            modernizr: {
                options: {
                    mangle: true,
                    beautify: false
                },
                files: {
                    'app/js/vendor/modernizr.js': ['bower_components/modernizr/modernizr.js']
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
                    cwd: 'app/jade/',
                    src: ['*.jade'],
                    dest: 'app/',
                    ext: '.html',
                    extDot: 'first'
                }]
            }
        },<%  } %> 
        // optimize images
        imagemin: {
            dist: {
                expand: true,
                cwd: 'app/img/src/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: 'app/img/build/'
            }
        },
        // watch for changes in files
        watch: {
            // watch for changes in CSS
            styles: {
                files: ["app/css/*.less"],
                tasks: ['less', 'autoprefixer', 'cssmin'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for changes in script
            scripts: {
                files: ['app/js/*.js'],
                tasks: ['uglify:site'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },
            // watch for updates in images
            images: {
                files: ['app/img/src/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },<% if (includeJade) { %>
            jades: {
                files: ['app/jade/**/*.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            },<% } %>
            // watch for updates in html
            html: {
                files: ['app/*.html', 'app/templates/*.html'],
                options: {
                    livereload: true,
                    event: ['added', 'deleted', 'changed']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-jade');

    // Default task(s).
    grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'uglify', 'newer:imagemin', <% if (includeJade) { %>'jade', <% } %>'connect', 'watch']);

};
