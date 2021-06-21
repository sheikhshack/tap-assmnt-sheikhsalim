const express = require('express');
require('express-async-errors');
const app = express()
const cors = require('cors');


const config = require("./utils/config");
const logger = require("./utils/logger");
const urlRouter = require("./controllers/urlRouter");
const middleware = require("./utils/middleware")
const {Short} = require('./models/short')




config.SQL.authenticate()
    .then(() => {
        Short.sync()
        logger.info('MySQL server authenticated and connected successfully')

    })
    .catch((err) => {
        logger.error('Problems establishing connection to SQL Server, Killing app: ', err.message )
        process.exit(1)


    })



app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

app.use(express.static('build'))
app.use('/', urlRouter)


app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint)

module.exports = app