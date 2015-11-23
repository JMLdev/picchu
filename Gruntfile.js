module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Load Grunt modules
    require('load-grunt-tasks')(grunt);

    // assets to package
    var assetLists = {
        dist: [
            'src/FormElements/formElements.js'
        ]
    };
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Compile css/*.scss Sass files
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    map: false
                },
                files: {
                    'dist/picchu.css': 'src/picchu.scss',
                    'dist/site-style.css': 'src/site-style.scss',
                    'dist/picchu-namespace.css': 'src/picchu-namespace.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                map: false
            },
            dist: {
                files: {
                    'dist/picchu.css': 'dist/picchu.css',
                    'dist/picchu-namespace.css': 'dist/picchu-namespace.css'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/picchu.min.css': 'dist/picchu.css',
                    'dist/picchu-namespace.min.css': 'dist/picchu-namespace.css'
                }
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: assetLists.dist,
                dest: 'dist/picchu.js'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/picchu.min.js': ['dist/picchu.js']
                }
            }
        },

        assemble: {
			options: {
				partials: ['src/doc/partials/**/*.hbs'],
				layout: ['src/doc/layouts/default.hbs'],
				flatten: true,
				data: 'src/doc/data/*.json',
			},
			pages: {
				src: ['src/doc/*.hbs', 'src/doc/standards/*.hbs'],
				dest: 'dist/'
			}
		},

		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {
				  livereload: true,
				},
			},
			html: {
				files: '**/*.hbs',
				tasks: ['assemble'],
				options: {
					livereload: true,
				}
			},
			data: {
				files: '**/*.json',
				tasks: ['assemble'],
				options: {
					livereload: true,
				}
			}
			assets: {
				files: 'src/assets/**/*',
				tasks: ['copy'],
				options: {
					livereload: true,
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 3000,
					base: ['public', 'dist/'],
					hostname: 'localhost',
					livereload: true,
					open: true
				}
			}
		},

		copy: {
			assets: {
				expand: true,
				cwd: 'src/',
				src: 'assets/**/*',
				dest: 'dist/'
			},
		},

		/* DESTRUCTIVE - don't change this config unless you know what you are doing! */
		clean: {
			dist: ["dist/**/*"]
		},
    });
    // Set Grunt tasks
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'assemble', 'copy']);
    grunt.registerTask('server', ['sass', 'autoprefixer', 'concat', 'uglify', 'connect', 'watch']);

};
