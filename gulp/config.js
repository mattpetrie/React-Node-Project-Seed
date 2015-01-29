// set default source and build directories
var dest = './build';
var src = './src';

module.exports = {
  // options for Gulp tasks go here
  webpack: {
    src: src + '/**/*.*',
  },
  markup: {
    src: src + '/views/**/*.html',
    dest: dest + '/views'
  },
  nodemon: {
    script: 'server/main.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' },
    watch: 'server/**',
    nodeArgs: ['--debug'],
  },
  sass: {
    src: src + '/stylesheets/**/*.{sass,scss}',
    dest: dest + '/stylesheets',
    options: {
      sourceComments: 'map',
      imagePath: '/images'
    }
  },
};
