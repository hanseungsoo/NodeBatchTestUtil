const express = require('express');
const tcpServer = require('../bin/tcpRuntime')
const debug = require('debug')('router:Index')
const socketHolder = require('../bin/classes/SocketHolder')
const router = express.Router();
let saveSocket = new socketHolder()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/tcpCall', (req, res) => {
	const serverSocket = tcpServer()
	serverSocket.listen(3333, () => {
		debug('server bound')
		saveSocket.socket = serverSocket
		saveSocket.port = 3333

		res.json( { state: 'RUNNING' } )
	})

	serverSocket.on('error', (err) => {
            debug(err)
            server.close()
            res.json( { state: 'FAIL' } )
    })
})

router.get('/tcpCancel', (req, res) => {
    const socket = saveSocket.getSocket()
    if( socket === undefined) {
        res.json( { state: 'FAIL' } )
    } else {
        socket.close( () => {
            debug('server closed')
            res.json( { state: 'STOP' } )
        })
    }
})

module.exports = router
