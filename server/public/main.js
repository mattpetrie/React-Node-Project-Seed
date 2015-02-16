import express from 'express';
import path from 'path';

const router = express.Router();

/* Since this is a single page app, the only thing necessary to do here
should be sending index.html, but you could add routes to for other
pages if necessary */
router.route('/')
  .get(function(req, res) {
    res.sendFile('../../build/index.html', { root: __dirname });
  });

export default router;
