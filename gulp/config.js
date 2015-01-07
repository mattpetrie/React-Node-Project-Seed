// set default source and build directories
var dest = './build';
var src = './src';

module.exports = {
  // options for Gulp tasks go here
  browserSync: {
    proxy: 'localhost:8080'
  },
  markup: {
    src: src + '/views/**',
    dest: dest + '/views'
  },
  sass: {
    src: src + '/stylesheets/*.{sass,scss}',
    dest: dest + '/stylesheets',
    options: {
      sourceComments: 'map',
      imagePath: '/images'
    }
  },
};
