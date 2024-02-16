const express = require('express');
const outsideController = require('../controllers/outside.controller');
const router = express.Router();

router.route('/all').get(outsideController.getAllOutsides);

module.exports = router;