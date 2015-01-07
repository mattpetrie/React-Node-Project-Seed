// set default source and build directories
var dest = './build';
var src = './src';

module.exports = {
  // options for Gulp tasks go here
  browserSync: {
    server: {
      baseDir: dest + '/views'
    }
  },
  markup: {
    src: src + '/views/**',
    dest: dest + '/views'
  },
};
