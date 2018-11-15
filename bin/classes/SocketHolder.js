
'use strict'
class SocketHolder{

 constructor(socekt, port){
    this.socket = socekt
    this.port = port
 }

 getSocket() {
    return this.socket
 }
}

module.exports = SocketHolder