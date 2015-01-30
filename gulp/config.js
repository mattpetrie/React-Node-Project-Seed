// set default source and build directories
var dest = './build';
var src = './src';

module.exports = {
  // options for Gulp tasks go here
  webpack: {
    src: src + '/**/*.*',
  },
  markup: {
    /* there most likely won't be a need for any markup other than a main
    index.html but you can add more configuration here if necessary */
    src: src + 'index.html',
    dest: dest
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
