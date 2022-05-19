const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.get('/login', UserController.getUserByEmail);

router.get('/getUserInformation', UserController.getUserInformation);

module.exports = router;