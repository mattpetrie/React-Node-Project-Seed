// set default source and build directories
var dest = './build';
var src = './src';

module.exports = {
  // options for Gulp tasks go here
  markup: {
    /* there most likely won't be a need for any markup other than a main
    index.html but you can add more configuration here if necessary */
    src: src + '/index.html',
    dest: dest
  },
  server: {
    script: 'server/main.js',
    ext: 'js html',
    watch: 'server/**/*.*',
    nodeArgs: ['--debug'],
  },
};
