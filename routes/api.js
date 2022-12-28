//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Packages

const express = require("express");
const router = express.Router();
const rcon = require('rcon');
const fetch = require("node-fetch");

const config = require('../config.json');

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
        switch (req.body.channelID) {
            case "907904725872156752":
                ip = config.aim1.ip
                port = config.aim1.port
                lable = "aim1"
                break;
            case "947773253412352010":
                ip = config.aim2.ip
                port = config.aim2.port
                lable = "aim2"
                break;
            case "947773296194224158":
                ip = config.awp1.ip
                port = config.awp1.port
                lable = "awp1"
                break;
            case "947773335427751937":
                ip = config.pub1.ip
                port = config.pub1.port
                lable = "pub1"
                break;
            case "947773356650942464":
                ip = config.pub2.ip
                port = config.pub2.port
                lable = "pub2"
                break;
            case "947773375449792572":
                ip = config.pub3.ip
                port = config.pub3.port
                lable = "pub3"
                break;
            case "947773397780283402":
                ip = config.pub4.ip
                port = config.pub4.port
                lable = "pub4"
                break;
            case "947773422006566922":
                ip = config.pub5.ip
                port = config.pub5.port
                lable = "pub5"
                break;
            case "1056654594291273778":
                ip = config.pub6.ip
                port = config.pub6.port
                lable = "pub6"
                break;

            default:
                res.status(401).send({ error: 'Invalid Channel ID' })
                break;
        }
        //Try To Connect Server Rcon ===========================================//
        try {

            connection = new rcon(ip, port, process.env.PASSWORD, {
                "tcp": true,
                "challenge": false
            })
            connection.connect()

            connection.on("auth", async () => {

                console.log("connected");
                connection.send(req.body.cmd)

            }).on('response', async function (str) {
                if (str.length > 1) {
                    await sendResponse(lable + "\n" + str, req.body.channelID)
                    console.log(lable + " Response: " + str);
                }

            }).on('error', async function (err) {
                sendError(lable + "\n" + err)
                console.log(lable + " Error : " + err);
            }).on('end', function () {
                console.log("Connection closed");
            });
        } catch (error) {
            console.log(error);
            sendError(error)
        }

        return res.status(200).send({ ip, port, lable })
    }

});
//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Exports Router

module.exports = router;
