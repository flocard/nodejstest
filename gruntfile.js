/**
 * Created by sogeti on 08/07/15.
 */
'use strict';
var path = require('path');
var pkgJson = require('./package.json');
var modulepkgJson = require('./modulers/package.json');

module.exports = function (grunt) {
    var deliveryResourcesDir = "delivery/resources";
    var finalArchiveName = pkgJson.name + '-' + pkgJson.version;

    //Init grunt configuration file
    grunt.initConfig({
            // Code coverage section
            copy: {
                configFiles: {
                    expand: true,
                    flatten: true,
                    src: [deliveryResourcesDir+'/config/*'],
                    dest: './dist/resources/config'
                }
            },
            'template': {
                'requires': {
                    'options': {
                        'data': {
                            'application_version': pkgJson.version,
                            'module_code': modulepkgJson.name,
                            'module_version': modulepkgJson.version,
                            'application_code': pkgJson.name
                        }
                    },
                    'files': {
                        './dist/resources/node-js-project.requires': [deliveryResourcesDir + '/node-js-project.requires']
                    }
                },
                'db_requires': {
                    'options': {
                        'data': {
                            'version_db_require': 'none',
                        }
                    },
                    'files': {
                        './database/resources/requires': [deliveryResourcesDir + '/database/requires']
                    }
                }
            },
            rename: {
                requires: {
                    files: [
                        {
                            src: ['./dist/resources/node-js-project.requires'],
                            dest: './dist/resources/' + finalArchiveName + '.requires'
                        },
                    ]
                },
                confFiles: {
                    files: [
                        {
                            src: ['./dist/resources/config/config-tech.json'],
                            dest: './dist/resources/config/' + modulepkgJson.name + '-config-tech.json'
                        },
                        {
                            src: ['./dist/resources/config/logger-config.json'],
                            dest: './dist/resources/config/' + modulepkgJson.name + '-logger-config.json'
                        },
                    ]
                }
            },
            compress: {
                finalArchive: {
                    options: {
                        archive: './dist/'+pkgJson.name+'-'+pkgJson.version+'.tar.gz'
                    },
                    files: [
                        {expand: true,cwd:'./dist/',src: [modulepkgJson.name +'.tgz'],dest: modulepkgJson.name+ '/' + modulepkgJson.version + '/nodejs'},
                        {expand: true,cwd:'./dist/resources/config', src: ['*'],dest: modulepkgJson.name+ '/' + modulepkgJson.version + '/nodejs/conf'},
                        {expand: true, cwd:'./dist/resources',src: [finalArchiveName+'.requires'], dest:'.'},
                        {expand: true, cwd:'./database/resources',src: ['*'], dest:'mysqlha/'+pkgJson.name+'/'+modulepkgJson.version},
                    ]
                }
            },
            move: {
                subArchive: {
                     src:  './modulers/' + modulepkgJson.name+'-'+modulepkgJson.version+'.tgz',
                    dest: './dist/'+modulepkgJson.name + '.tgz',
                }
            },
            clean: {
                options: {
                    'force': true
                },
                folder: ['dist'],
            }
        }
    );

    /*
     ,
    */
    //Global
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-move');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('archive', [
              'clean'
            , 'copy:configFiles'
            , 'template:requires'
            , 'template:db_requires'
            , 'rename'
            , 'move:subArchive'
            , 'compress:finalArchive'
        ]
    );
};
