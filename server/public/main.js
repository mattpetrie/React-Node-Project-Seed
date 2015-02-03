import express from 'express';
import path from 'path';

const router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.sendFile('../../build/index.html', { root: __dirname });
  });

export default router;
