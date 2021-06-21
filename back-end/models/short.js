const {DataTypes} = require('sequelize');
const sequelize = require('../utils/config').SQL
const hostname = require("../utils/config").HOSTNAME
const port = require("../utils/config").PORT

// Sequelize will automatically create table Shorts
const Short = sequelize.define('Short', {
    shortenedURL: {
        type: DataTypes.STRING,
        primaryKey: true,
        get() {

            const rawValue = this.getDataValue('shortenedURL')
            return appendHostname(rawValue)
        }
    },
    actualURL: {type: DataTypes.STRING}
})

const appendHostname = (shortURL) => {
    console.log("Triggered append hostname", shortURL)
    return new URL(`http://${hostname}:${port}/${shortURL}`).toString()
}


module.exports = {Short}