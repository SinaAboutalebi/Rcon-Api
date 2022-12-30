//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Packages

const express = require("express");
const router = express.Router();
const rcon = require('rcon');
const fetch = require("node-fetch");

const config = require('../config.json');
const getServer = require('../functions/getServer.js');
const logger = require('../functions/logger');

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Params

let ip, port, lable;

let errorEmbed = {
    timestamp: new Date().toISOString(),
    title: "Error",
    color: parseInt("#FD0000".split("#")[1], 16),
}

let responseEmbed = {
    timestamp: new Date().toISOString(),
    color: parseInt("#35fc03".split("#")[1], 16),
}
//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Functions

async function sendError(err) {
    errorEmbed.description = err.toString()
    let data = await fetch(
        `https://discord.com/api/v10/channels/947499545393262623/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                embeds: [errorEmbed]
            }),
        })
}

async function sendResponse(err, channel) {
    responseEmbed.description = err.toString()
    let data = await fetch(
        `https://discord.com/api/v10/channels/${channel}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                embeds: [responseEmbed]
            }),
        })
}
//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Routes

router.post("/command", async (req, res) => {

    if (req.body.auth != process.env.SECRET) {
        return res.status(401).send({ error: 'Unauthorized' })
    } else {
        //Get Server Ip Port Based On Channel ID================================//
        const server = getServer(req.body.channelID);
        if(server.error){
            return res.status(401).send({error: server.error})
        }
        //Try To Connect Server Rcon ===========================================//
        try {

            connection = new rcon(server.ip, server.port, process.env.PASSWORD, {
                "tcp": true,
                "challenge": false
            })
            connection.connect()

            connection.on("auth", async () => {

                console.log("connected");
                if (!req.body.cmd.startsWith("sm_")) {
                    command = req.body.cmd.replace(/sm/g, 'sm_').replace("sm_ ", "sm_")
                }
                else { command = req.body.cmd }
                connection.send(command)

            }).on('response', async function (str) {
                if (str.length > 1) {
                    await sendResponse(server.lable + "\n" + str, req.body.channelID)
                    console.log(server.lable + " Response: " + str);
                }

            }).on('error', async function (err) {
                sendError(server.lable + "\n" + err)
                console.log(server.lable + " Error : " + err);

            }).on('end', function () {
                console.log("Connection closed");
            });

        } catch (error) {
            console.log(error);
            sendError(error)
        }
        logger(server.lable+" : "+req.body.user+" - "+req.body.cmd)
        return res.status(200).send(server)
        
    }

});
//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Exports Router

module.exports = router;
