const express = require('express');
const UserEventRouter = require('./eventRouters/UserEventRouter');
const router = express.Router();

router.get('/login', UserEventRouter.getLoginByEmail);

router.get('/getUserInformation', UserEventRouter.getUserInformation);

router.get('/getUserAccount', UserEventRouter.getUserAccount);

router.get('/getLinkRef', UserEventRouter.getLinkRef);

router.get('/logout', UserEventRouter.logout);

module.exports = router;