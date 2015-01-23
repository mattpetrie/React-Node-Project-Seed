'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.sendFile('index.html', { root: './build/views' });
  });

module.exports = router;
