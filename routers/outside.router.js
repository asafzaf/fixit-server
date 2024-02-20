const express = require('express');
const outsideController = require('../controllers/outside.controller');
const router = express.Router();

router.route('/').get(outsideController.getAllOutsides);

module.exports = router;