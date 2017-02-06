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
    watch: {
      scripts: {
        files: ['**/*.scss'],
        tasks: ['sass'],

      },
    }
  });


  // Load the grunt plugins
  //what tasks we want to load
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');



  // Default task(s).
  //declare what taskes we want to run
  grunt.registerTask('default', ['sass']);

};
