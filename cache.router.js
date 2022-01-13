const express = require('express');
const router = express.Router();

const userController = require('./cache.controller');

router.get('/', userController.getExcel);

module.exports = router;