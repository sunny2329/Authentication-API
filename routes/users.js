const express = require('express');
const userCtrl = require('../controller/user.js');
const router = express.Router();


//! Register
router.post('/api/users/register',userCtrl.register);
router.post('/api/users/login',userCtrl.login);
router.get('/api/users/profile/:username',userCtrl.profile);


module.exports = router;