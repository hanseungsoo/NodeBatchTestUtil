const net = require('net')
const debug = require('debug')('tcpRuntime:Server')
const recvBkFtc = require('./batchStyle/bkFtc/recvBkFtc')
const { lengthChecker } = require('./util/batchUtil')
const { bkFtcSpec } = require('./batchStyle/messageSpec')

module.exports = () => {

	const server = net.createServer( (client) => {
		debug('client connected')

		client.on('end', () => {
			debug('client disconnected')
		})

		client.on('data', (chunk) => {
		    const sendStyle = new recvBkFtc(client)

            while ( chunk.length !== 0 ) {
                debug(chunk.length)
                let tx = sendStyle.txAnalyzer(chunk)
                debug('[TX] : [' + tx + ']')

                switch ( tx ) {
                    case '0600':
                        let messageSize = lengthChecker(chunk, 'bkFtc')
                        messageBufObj = sendStyle.headerMessageParser( chunk, messageSize )
                        sendStyle.txStartReq(messageBufObj.realBuf)
                        sendStyle.txStartRes(messageBufObj.realBuf)
                        chunk = messageBufObj.remainBuf
                        break
                }

            }
		})
	})

	server.on('close', () => {
		debug('close Server')
	})

	return server
}
