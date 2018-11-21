const net = require('net')
const debug = require('debug')('BkFtc:recv')
const { bkFtcSpec } = require('../messageSpec')
const { zeroPad } = require('../../util/batchUtil')
'use strict'
class recvBkFtc{

 constructor(socket){
    this.socket = socket
 }

 txStartReq ( buf )  {
    debug('[RECV] : [' + buf.toString() + ']')
 }

 txStartRes ( buf )  {
    const resLenForm = zeroPad(bkFtcSpec.TX0610, 4)
    const data = `${resLenForm}${buf.toString()}`
 	this.socket.write(data, () => {
 	    debug('[SEND] : [' + data.toString() + ']')
 	})
 }

 txAnalyzer ( orgBuf ) {
     const txBuf = Buffer.allocUnsafe(bkFtcSpec.TX_SIZE).fill(0)
     orgBuf.copy(txBuf, 0, bkFtcSpec.TX_OFFSET, bkFtcSpec.TX_OFFSET + bkFtcSpec.TX_SIZE);
     return txBuf.toString()
 }

 headerMessageParser ( chunk, size ) {
    let realBuf
    let remainBuf
    if ( bkFtcSpec.LEN_SIZE_INCLUDE === true ) {
        realBuf = Buffer.allocUnsafe( size - bkFtcSpec.LEN_SIZE ).fill(0)
        remainBuf = Buffer.allocUnsafe( chunk.length - size).fill(0)

        chunk.copy( realBuf, 0, bkFtcSpec.LEN_OFFSET + bkFtcSpec.LEN_SIZE, realBuf.length + bkFtcSpec.LEN_SIZE )
        chunk.copy( remainBuf, 0, realBuf.length, remainBuf.length )
    } else {
        realBuf = Buffer.allocUnsafe( size ).fill(0)
        remainBuf = Buffer.allocUnsafe( chunk.length - (size + bkFtcSpec.LEN_SIZE )).fill(0)

        chunk.copy( realBuf, 0, bkFtcSpec.LEN_OFFSET + bkFtcSpec.LEN_SIZE, realBuf.length + bkFtcSpec.LEN_SIZE)
        chunk.copy( remainBuf, 0, realBuf.length + bkFtcSpec.LEN_SIZE, remainBuf.length )
    }
    return {
        realBuf,
        remainBuf
    }
 }
}

module.exports = recvBkFtc

