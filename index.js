//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Packages

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const routes = require("./routes");

const app = express();
//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Colors

magenta = "\x1b[35m";
cyan = "\x1b[36m";
blue = "\x1b[34m";

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//MiddleWares 

app.use(cors({ methods: ['GET','POST']}));
app.use(bodyParser.json());

app.use("/api", routes);

app.use("*", (req, res) => {
    res.status(401).send({ error: 'Unauthorized' });
});

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Server StartUP

app.listen(process.env.PORT, async () => {
    console.log(
        magenta,
        "[📶]Server Is Running Properly ....\n [⚙️]Port : ",
        process.env.PORT
    );

    client.once("ready", () => {
        console.log(
            blue,
            `[✅] Logged in as ${client.user.tag} (${client.user.id}).`
        );
        console.log(cyan, "[🖥️] Coded By Savage 0P :)🦠");

        client.user.setStatus("idle");
        client.user.setActivity("Coded By Savage 0P :)🖥️", {
            type: ActivityType.Watching,
        });
    });
});

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Bot Login 

client.login(process.env.TOKEN)