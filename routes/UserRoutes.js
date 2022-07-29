const express = require('express');
const UserEventRouter = require('./eventRouters/UserEventRouter');
const router = express.Router();

router.post('/login', UserEventRouter.getLoginByEmail);

router.get('/getUserPin', UserEventRouter.getUserPin);

router.post('/saveUserPinCode', UserEventRouter.saveUserPinCode);

router.get('/getUserInformation', UserEventRouter.getUserInformation);

router.get('/getUserAccount', UserEventRouter.getUserAccount);

router.get('/getLinkRef', UserEventRouter.getLinkRef);

router.post('/logout', UserEventRouter.logout);

router.get('/getSignal',UserEventRouter.getSignal);

module.exports = router;