module.exports = function(grunt) {

    var tsServerSources = ['src/server/typescript/**/*.ts'];
    var tsClientSources = ['src/client/typescript/**/*.ts'];
    var staticDir = "src/client/static/";
    var tsSources = tsServerSources.concat(tsClientSources);
    var tsServerScript = 'build/server.js';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            server: {
                src: tsServerSources
            },
            client: {
                src: tsClientSources
            }
        },
        ts: {
            server: {
                src: tsServerSources,
                out: tsServerScript,
                options: {
                    module: 'commonjs',
                    fast: 'never'
                }
            },
            client: {
                src: tsClientSources,
                out: 'build/client.js'
            }
        },
        copy: {
            statik: {
                files: [
                    {
                        cwd: staticDir,
                        src: ["**"],
                        dest: "build/static",
                        expand: true
                    }
                ]
            }
        },
        watch: {
            options: {
                livereload: 11337
            },
            server: {
                files: tsServerSources,
                tasks: ['newer:tslint:server', 'ts:server'],
                options: {
                    spawn: false
                }
            },
            client: {
                files: tsClientSources,
                tasks: ['newer:tslint:client', 'ts:client'],
                options: {
                    spawn: false
                }
            },
            statik: {
                files: staticDir + "/**",
                tasks: ['newer:copy:statik'],
                options: {
                    spawn: false
                }
            }
        },
        nodemon: {
            dev: {
                script: tsServerScript
            },
            options: {
                ignore: ['node_modules/**', 'Gruntfile.js'],
                env: {
                    port: '8181'
                }
            }
        },
        concurrent: {
            watchers: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        clean: {
            build: ["build", "typings", ".tscache"]
        }
    });

    grunt.loadNpmTasks("grunt-newer");
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['tslint', 'ts', 'copy']);
    grunt.registerTask('serve', ['default', 'concurrent:watchers']);
};
