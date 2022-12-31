//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Packages 

const express = require('express');
const router = express.Router();

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Set Routes

const commandRouter = require('./command');
router.use('/command', commandRouter)


module.exports = router;

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//