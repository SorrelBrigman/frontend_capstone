

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
                'client/styles/main.css': 'client/styles/main.scss',
                'client/lib/materialize/dist/css/materialize.css' : 'client/lib/materialize/sass/materialize.scss'
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
          src: ['client/app/**/*.js']
        }
    },

    watch: {
      javascripts: {
        files: ['client/app/**/*.js'],
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
