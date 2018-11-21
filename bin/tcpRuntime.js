const net = require('net')
const logger = require('./util/logger')
const endpointReader = require('./util/readEndpoint')
const socketHolder = require('./util/SocketHolder')

module.exports = (endpointName, callback) => {
    const that = this
    endpointReader(endpointName).then((endpointData) => {
        const server = net.createServer( (client) => {
            logger.info('## Client connected')
            logger.info(`-> Remote Ip [${client.remoteAddress}], Remote Port [${client.remotePort}]`)
    
            client.on('end', () => {
                logger.info('## client closed')
                logger.info(`-> Remote Ip [${client.remoteAddress}], Remote Port [${client.remotePort}]`)
            })
    
            client.on('data', (chunk) => {
                client.write(chunk)
            })
            //server.maxConnections = endpointData.maxConnection
            server.maxConnections = 1
        })
        server.listen(endpointData.PORT, () => {
            logger.info('## Server listen success')
            logger.info(`-> Listen port [${endpointData.PORT}]`)
            socketHolder.endpointName = endpointName
            socketHolder.clientSocket = server
            socketHolder.endpointPort = endpointData.PORT
            callback({ state: 'RUNNING' })
        })

        server.on('close', () => {
            logger.info('## Server closed')
        })
    }).catch((err) => {
        logger.info(`## Loading fail [${endpointName}]`)
        callback({ state: 'FAILED', message: err.message })
    })
}
