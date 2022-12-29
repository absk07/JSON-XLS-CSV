const express = require('express');
const router = express.Router();
const catchAsync = require('../../middleware/catchAsync');

const upload = require('../../utils/fileStorage');

const indexController = require('../../controllers/file/index');

const isAuth = require('../../middleware/isAuth');

router.get('/', isAuth, catchAsync(indexController.getList));

router.get('/upload', isAuth, catchAsync(indexController.getUpload));

router.post('/upload', isAuth, upload.single('myFile'), catchAsync(indexController.postUpload));

router.get('/file/:id', isAuth, catchAsync(indexController.showFile));

router.post('/file/edit/:id', isAuth, catchAsync(indexController.editFile));

router.post('/file/delete/:id', isAuth, catchAsync(indexController.deleteFile));

module.exports = router;