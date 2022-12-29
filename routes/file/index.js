const express = require('express');

const router = express.Router();

const fileRoutes = require('./file');

router.use('/', fileRoutes);

module.exports = router;