const urlRouter = require('express').Router()
const logger = require('../utils/logger')
const helper = require('../utils/helper')
const {Short} = require('../models/short')


urlRouter.get('/:short', async (request, response, next) => {
    const url = String(request.params.short)

    const urlObject = await Short.findByPk(url)
    if (!urlObject) {
        return response.status(404).json({error: 'url not found'});
    }
    logger.info('Retrieved URL of', urlObject.actualURL)
    response.redirect(urlObject.actualURL)

})

urlRouter.post('/', async (request, response) => {
    const {actualURL} = request.body
    // throws a custom error if URL is invalid, handled by error handler
    helper.checkValidURL(actualURL)

    let randomID = await helper.generator() // function will automatically check for clashes
    const savedShort = await Short.create({
        actualURL,
        shortenedURL: randomID
    })

    response.status(201).json(savedShort)

})

module.exports = urlRouter