const crypto = require("crypto")
const validator = require("validator")
const {Short} = require('../models/short')
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-';
const nanoid = customAlphabet(alphabet, 8);






const generatorOld= async () => {
    let rar = crypto.random
    let token = crypto.randomBytes(8).toString("base64")
    while (await Short.findByPk(token) !== null) {
        token = crypto.randomBytes(8).toString("base64")
    }

    return token
}

const generatorOld2= async () => {
    let token = base62.encode(crypto.randomBytes(8)).substring(0,6)
    while (await Short.findByPk(token) !== null){
        token = base62.encode(crypto.randomBytes(8))
    }

    return token
}

const generator= async () => {
    let token = nanoid()
    while (await Short.findByPk(token) !== null){
        token = nanoid()
    }

    return token
}


const checkValidURL = (url) => {
    const validity = validator.isURL(url, {require_protocol: true, require_valid_protocol: true})
    if (!validity){
        let e = new Error('Malformed input')
        e.name = 'URLError'
        throw e
    }
}

const encodeURL = (url) => {
    return new URL(url).toString()
}



module.exports = {
    generator,
    checkValidURL,

}