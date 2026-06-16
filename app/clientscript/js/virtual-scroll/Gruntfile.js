module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*!\n\
* <%= pkg.name %>: <%= pkg.description %> \n\
* Version: <%= pkg.version %> \n\
* © <%= pkg.author %> */'
            },
            kast: {
                src: ['src/vscroll.js'],
                dest: 'dist/vscroll.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};