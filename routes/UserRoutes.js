const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.get('/login', UserController.getUserByEmail);

module.exports = router;