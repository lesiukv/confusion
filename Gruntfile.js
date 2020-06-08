'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{

                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{

                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            build: {
                src: ['docs/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'docs/'
                }]
            }
        },
        useminPrepare: {
            foo: {
                dest: 'docs',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },

            dist: {}
        },

        uglify: {
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },

            release: {
                files: [{
                    src: [
                        'docs/js/*.js',
                        'docs/css/*.css',
                    ]
                }]
            }
        },

        usemin: {
            html: ['docs/contactus.html', 'docs/aboutus.html', 'docs/index.html'],
            options: {
                assetsDirs: ['docs', 'docs/css', 'docs/js']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {
                    'docs/index.html': 'docs/index.html',
                    'docs/contactus.html': 'docs/contactus.html',
                    'docs/aboutus.html': 'docs/aboutus.html',
                }
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};