const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};



const errorHandler = (error, request, response, next) => {
    logger.error("Intercepted Error", error.message, error.name);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' });
    } else if (error.name === 'URLError') {
        return response.status(400).send({ error: 'malformed url' });
    }

    next(error);
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}