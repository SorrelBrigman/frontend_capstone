

//a node thing:
module.exports = (grunt)=> {

  // Project configuration.
  grunt.initConfig({
    sass: {
        options: {
            sourceMap: true,
            outputStyle: 'compressed',
        },
        dist: {
            files: {
                'styles/main.css': 'styles/main.scss'
            }
        }
    },
      jshint: {
        options: {
          predef: ["document", "console"],
          esnext: true,
          // globalstrict: true,
          globals: {"$": true},
          browserify: true
        },
        files: {
          src: ['app/**/*.js']
        }
    },

    watch: {
      javascripts: {
        files: ['app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass']
      }
    }
  })


  // Load the grunt plugins
  //what tasks we want to load

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'sass', 'watch']);


  // Default task(s).
  //declare what taskes we want to run
  // grunt.registerTask('default', ['sass', 'watch']);

};
