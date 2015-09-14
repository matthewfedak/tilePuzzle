module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            tilePuzzleJs: {
                // the files to concatenate
                src: ['js/*.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            },
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy hh:mm:ss") %> */\n',
                report: 'gzip',
                mangle: true,
                beautify : false,
                compress : true,
            },
            tilePuzzleJs: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.tilePuzzleJs.dest %>']
                }
            }
        },
        clean: {
            assets: ['<%= concat.tilePuzzleJs.dest %>']
        },
        watch: {
            tilePuzzleJs: {
                files: ['js/*.js', 'test/*'],
                tasks: ['vars', 'jasmine:test', 'concat:tilePuzzleJs', 'uglify:tilePuzzleJs'],
                options: {

                }
            }
        },
        jasmine: {
            test: {
                src: 'js/*.js',
                options: {
                    vendor: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    specs: 'test/*.spec.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('vars', function () {
        grunt.config.set('tilePuzle', grunt.tilePuzzle);
    });

    grunt.registerTask('tilePuzzleWatch', ['vars', 'watch']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['vars', 'concat', 'uglify', 'clean']);

    // Travis CI task.
    grunt.registerTask('travis', ['vars', 'jasmine:test']);
};
