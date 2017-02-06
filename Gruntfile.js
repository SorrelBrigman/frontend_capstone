require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks


//Project configuration
grunt.initConfig({
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'main.css': 'main.scss'
            }
        }
    }
});


//default task is sass
grunt.registerTask('default', ['sass']);
