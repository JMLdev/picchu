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
				helpers: ['handlebars-helpers/*.js'],
				flatten: true,
				data: 'src/doc/data/*.json',
			},
			pages: {
				src: ['src/doc/*.hbs'],
				dest: 'dist/'
			}
		},

		connect: {
			server: {
				options: {
					port: 3000,
					base: ['./', './dist/'],
					hostname: 'localhost',
					livereload: true,
					open: true
				}
			}
		}
    });

    // Set Grunt tasks
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'assemble']);
    grunt.registerTask('server', ['connect', 'sass', 'autoprefixer', 'concat', 'uglify']);

};
