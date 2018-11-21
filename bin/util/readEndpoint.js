const fs = require('fs')
const path = require('path')
const logger = require('./logger')
module.exports = (endpointName) => {
    const endpointFile = path.normalize(path.join(__dirname, '..', '..', 'repository', 'endpoint', endpointName)) + '.json'

    logger.info(`## Loading from ${endpointName}`)
    logger.info(`-> ${endpointFile}`)
    return new Promise((resolve, reject) => {
        fs.readFile(endpointFile, (err, endpointData) => {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(endpointData.toString()))
        })
    })
}