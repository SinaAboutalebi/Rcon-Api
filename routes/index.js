//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Packages 

const express = require('express');
const router = express.Router();

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Set Routes

const commandRouter = require('./command'); //Default Command Router For Discord Bot
router.use('/command', commandRouter);

const customRouter = require('./custom'); //custom Command Router For Personal Use
router.use('/custom', customRouter);

module.exports = router;

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//