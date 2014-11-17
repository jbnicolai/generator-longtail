'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var pkgName = require('pkg-name');
var multiline = require('multiline');
var compareVersion = require('compare-version');


var LongtailGenerator = yeoman.generators.Base.extend({
        init: function () {
            this.pkg = require('../package.json');

            this.on('end', function () {
                if (!this.options['skip-install']) {
                    this.installDependencies();
                }
            });
        },

        askFor: function () {
            var done = this.async();

            // Have Yeoman greet the user.
            this.log(yosay('Welcome to the marvelous Longtail generator!'));

            var prompts = [{
                    name: 'name',
                    message: 'Project Name',
                    default: this.appname,
                    filter: function (input) {
                        var done = this.async();

                        pkgName(input, function (err, available) {
                            if (!available.bower && !available.npm) {
                                log.info(chalk.yellow(input) + ' already exists on npm and Bower. You might want to use another name.');
                            } else {
                                if (!available.bower) {
                                    log.info(chalk.yellow(input) + ' already exists on Bower. You might want to use another name.');
                                }

                                if (!available.npm) {
                                    log.info(chalk.yellow(input) + ' already exists on npm. You might want to use another name.');
                                }
                            }

                            done(input);
                        });
                    }
                }, {
                    name: 'title',
                    default: 'Awesome New Project'
                }, {
                    name: 'description',
                    default: 'The best project ever.'
                }, {
                    name: 'version',
                    default: '0.1.0'
                }, {
                    name: 'author_name'
                }, {
                    name: 'author_email'
                }, {
                    type: 'checkbox',
                    name: 'features',
                    message: 'What more would you like?',
                    choices: [{
                            name: 'Use Jade templating engine',
                            value: 'includeJade',
                            checked: false
                        }, {
                            name: 'Use SCSS (default is LESS)',
                            value: 'includeSCSS',
                            checked: false
                        }, {
                            name: 'ASPX form included in the markup',
                            value: 'includeForm',
                            checked: true
                        }]
                    }];

                var nameToMessage = function (name) {
                    return name.split('_').map(
                        function (x) {
                            return this._.capitalize(x);
                        }.bind(this)
                    ).join(' ') + ':';
                }.bind(this);

                // Generate prompt messages if only the name is defined.
                prompts.map(function (entry) {
                    if (entry.message === undefined) {
                        entry.message = nameToMessage(entry.name);
                    }
                    return entry;
                }.bind(this));

                this.currentYear = (new Date()).getFullYear();

                this.prompt(prompts, function (props) {
                    var features = props.features;

                    function hasFeature(feat) {
                        return features.indexOf(feat) !== -1;
                    }
                    this.slugname = this._.slugify(props.name);
                    this.camelname= this._.camelize(this.slugname);
                    this.includeJade = hasFeature('includeJade');
                    this.includeSCSS = hasFeature('includeSCSS');
                    this.includeForm = hasFeature('includeForm');
                    this.name = props.name;
                    this.title = props.title;
                    this.description = props.description;
                    this.version = props.version;
                    this.author_name = props.author_name;
                    this.author_email = props.author_email;

                    done();
                }.bind(this));
            },

                app: function () {
                    var ignores = [
                        '.git',
                        '.svn',
                        '_package.json',
                        '_bower.json',
                        'Gruntfile.js',
                        'jshintrc',
                        'index-dotnet.html',
                        'index-nodotnet.html',
                        'index-dotnet.jade',
                        'index-nodotnet.jade',
                        'apple-touch-icon-57x57.png',
                        'apple-touch-icon-72x72.png',
                        'apple-touch-icon-114x114.png',
                        'apple-touch-icon-120x120.png',
                        'apple-touch-icon-144x144.png',
                        'apple-touch-icon-152x152.png',
                        'favicon.ico',
                        'mstile-144x144.png',
                        'favicon-16x16.png',
                        'favicon-32x32.png',
                        'launchgrunt.command',
                        'launchgrunt.bat',
                        'main.js'
                    ];
                    this.mkdir('app');
                    this.mkdir('app/src');
                    this.mkdir('app/build');
                    this.mkdir('app/build/img');
                    this.mkdir('app/build/fonts');
                    this.mkdir('app/build/templates');
                    this.mkdir('app/build/css');
                    this.mkdir('app/build/js');
                    this.mkdir('app/build/js/vendor');
                    this.mkdir('app/src/img/');
                    if(this.includeSCSS) {
                        this.directory('scss', 'app/src/scss');
                    } else {
                        this.directory('less', 'app/src/less');
                    }
                    this.directory('css', 'app/src/css');
                    this.directory('js', 'app/src/js');
                    if(this.includeJade) {
                        this.directory('jade', 'app/src/jade');
                        if(this.includeForm) {
                            this.copy('index-dotnet.jade', 'app/src/jade/index.jade');
                        } else {
                            this.copy('index-nodotnet.jade', 'app/src/jade/index.jade');
                        }
                    }
                    if(this.includeForm) {
                        this.copy('index-dotnet.html', 'app/build/index.html');
                    } else {
                        this.copy('index-nodotnet.html', 'app/build/index.html');
                    }
                    this.copy('mstile-144x144.png', 'app/build/mstile-144x144.png');
                    this.copy('favicon-16x16.png', 'app/build/favicon-16x16.png');
                    this.copy('favicon-16x16.png', 'app/build/favicon-16x16.png');
                    this.copy('favicon-32x32.png', 'app/build/favicon-32x32.png');
                    this.copy('favicon.ico', 'app/build/favicon.ico');
                    this.copy('apple-touch-icon-57x57.png', 'app/build/apple-touch-icon-57x57.png');
                    this.copy('apple-touch-icon-72x72.png', 'app/build/apple-touch-icon-72x72.png');
                    this.copy('apple-touch-icon-114x114.png', 'app/build/apple-touch-icon-114x114.png');
                    this.copy('apple-touch-icon-120x120.png', 'app/build/apple-touch-icon-120x120.png');
                    this.copy('apple-touch-icon-144x144.png', 'app/build/apple-touch-icon-144x144.png');
                    this.copy('apple-touch-icon-152x152.png', 'app/build/apple-touch-icon-152x152.png');
                    this.expandFiles('*', {
                        cwd: this.sourceRoot(),
                        dot: true
                    }).forEach(function (el) {
                        if (ignores.indexOf(el) === -1) {
                            this.copy(el, 'app/src/'+el);
                        }
                    }, this);

                    this.copy('_package.json', 'package.json');
                    this.copy('_bower.json', 'bower.json');
                    this.copy('launchgrunt.command');
                    this.copy('launchgrunt.bat');
                },

                projectfiles: function () {
                    this.copy('editorconfig', '.editorconfig');
                    this.copy('jshintrc', '.jshintrc');
                    this.template('Gruntfile.js');
                    this.template('main.js', 'app/src/js/main.js');
                }
        });

    module.exports = LongtailGenerator;
