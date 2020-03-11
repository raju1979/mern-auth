const express = require('express');

const router = express();

const {signup, accountActivation, signin} = require('../controllers/auth');

//import validators
const {userSignupValidator, userSigninValidator} = require('../validators/auth');
const {runValidation} = require('../validators');

router.post('/signup',userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', signin);

module.exports = router;