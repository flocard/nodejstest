/**
 * Created by sogeti on 08/07/15.
 */
'use strict';
var path = require('path');
var pkgJson = require('./package.json');

module.exports = function (grunt) {

    var mainDir = '.'
    var test_output_dir = mainDir + '/test';
    var test_resources_dir = path.resolve('test/resources');

    //Init grunt configuration file
    grunt.initConfig({
            env: {
                options: {
                    //Shared Options Hash
                },
                test_reports_env: {
                    npm_package_config_mocha_sonar_reporter_outputfile: 'test/TEST-all.xml',
                    npm_package_config_mocha_sonar_reporter_testdir: 'test/js',
                    TEST_RESOURCES_DIR: test_resources_dir
                },
                coverage: {
                    APP_DIR_FOR_CODE_COVERAGE: path.resolve(test_output_dir) + '/coverage/instrument'
                },
                tests: {
                    ERABLE_CONFIG_DIR: test_resources_dir + '/config',
                    ERABLE_SERVICE: 'modulers'
                }
            },
            simplemocha: {
                options: {
                    globals: ['expect', 'logger', 'config'],
                    timeout: 3000,
                    ignoreLeaks: false,
                    force: true
                },
                default: {
                    options: {
                        reporter: 'mocha-jenkins-reporter',
                        reporterOptions: {
                            junit_report_name: 'Tests',
                            junit_report_path: test_output_dir + '/TEST-all.xml',
                            junit_report_stack: 1
                        }
                    }
                    ,
                    src: [test_output_dir + '/js/*.specs.js']
                }
            },
            // Code coverage section
            copy: {
                root_json: {
                    expand: true,
                    flatten: true,
                    src: ['./package.json'],
                    dest: test_output_dir + '/coverage/instrument/'
                },
            },
            instrument: {
                files: ['app/**/*.js','global.js'],
                options: {
                    lazy: true,
                    basePath: test_output_dir + '/coverage/instrument'
                }
            },
            storeCoverage: {
                options: {
                    dir: test_output_dir + '/coverage/reports'
                }
            }
            ,
            makeReport: {
                src: test_output_dir + '/coverage/reports/**/*.json',
                options: {
                    type: 'lcov',
                    dir: test_output_dir + '/coverage/reports',
                    print: 'detail'
                }
            }
        }
    );

    //Global
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-template');

    //UT
    grunt.loadNpmTasks('grunt-simple-mocha');

    //Coverage
    grunt.loadNpmTasks('grunt-istanbul');

    //Define grunt task
    grunt.registerTask('test', [
             'env:coverage'
            , 'copy:root_json'
            , 'instrument'
            , 'env:test_reports_env'
            , 'env:tests'
            , 'simplemocha:default'
            , 'storeCoverage'
            , 'makeReport'
        ]
    );
};
