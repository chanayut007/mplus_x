const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.get('/login', UserController.getUserByEmail);

router.get('/getUserInformation', UserController.getUserInformation);

router.get('/getUserAccount', UserController.getUserAccount);

router.get('/getLinkRef', UserController.getLinkRef);

module.exports = router;