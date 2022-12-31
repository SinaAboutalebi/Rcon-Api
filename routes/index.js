//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Packages 

const express = require('express');
const router = express.Router();

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Set Routes

const commandRouter = require('./command'); //Default Command Router For Discord Bot
router.use('/command', commandRouter);

const costumeRouter = require('./costume'); //Costume Command Router For Personal Use
router.use('/costume', costumeRouter);

module.exports = router;

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//