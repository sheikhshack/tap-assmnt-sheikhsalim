require('dotenv').config();
const {Sequelize} = require('sequelize')

let HOSTNAME = process.env.HOSTNAME

let PORT = process.env.PORT;
let PG_IP = process.env.PG_IP
let PG_USR = process.env.PG_USR
let PG_PASS = process.env.PG_PASS
let PG_DB = process.env.PG_DB



const SQL = new Sequelize(PG_DB, PG_USR, PG_PASS, {
    host: PG_IP,
    dialect: 'postgres'
})

module.exports = {
    PORT,
    SQL,
    HOSTNAME
};