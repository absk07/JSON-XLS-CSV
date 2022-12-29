const express = require('express');

const router = express.Router();

const adminRoutes = require('./admin/index');
const fileRoutes = require('./file/index');

router.use('/', adminRoutes);
router.use('/', fileRoutes);


module.exports = router;