//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Packages

const config = require('./config.json');

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//
//Export Data

module.exports = (channelID) => {

    data = {} //Define Empty Data Block

    //Get Server Ip Port Based On Channel ID================================//
    switch (channelID) {
        case "907904725872156752":
            data.ip = config.aim1.ip
            data.port = config.aim1.port
            data.lable = "aim1"
            break;
        case "947773253412352010":
            data.ip = config.aim2.ip
            data.port = config.aim2.port
            data.lable = "aim2"
            break;
        case "947773296194224158":
            data.ip = config.awp1.ip
            data.port = config.awp1.port
            data.lable = "awp1"
            break;
        case "947773335427751937":
            data.ip = config.pub1.ip
            data.port = config.pub1.port
            data.lable = "pub1"
            break;
        case "947773356650942464":
            data.ip = config.pub2.ip
            data.port = config.pub2.port
            data.lable = "pub2"
            break;
        case "947773375449792572":
            data.ip = config.pub3.ip
            data.port = config.pub3.port
            data.lable = "pub3"
            break;
        case "947773397780283402":
            data.ip = config.pub4.ip
            data.port = config.pub4.port
            data.lable = "pub4"
            break;
        case "947773422006566922":
            data.ip = config.pub5.ip
            data.port = config.pub5.port
            data.lable = "pub5"
            break;
        case "1056654594291273778":
            data.ip = config.pub6.ip
            data.port = config.pub6.port
            data.lable = "pub6"
            break;

        default:
            data = { error: 'Invalid Channel ID' } //Return Error
    }

    return data; //Return Data Block

}

//---------------------------🤍🍷 'Zer0Power 🍷🤍---------------------------//