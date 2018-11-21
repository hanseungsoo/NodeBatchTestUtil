const express = require('express');
const tcpRuntime = require('../bin/tcpRuntime')
const logger = require('../bin/util/logger')
const socketHolder = require('../bin/util/SocketHolder')
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/tcpCall', (req, res) => {
    //const resData = tcpRuntime(req.param.endpointName)
    const resData = tcpRuntime('testEp', (obj) => {
        res.json(obj)
    })
})

router.get('/tcpCancel', (req, res) => {
    const clientSocket = socketHolder.clientSocket
    if( clientSocket === undefined) {
        res.json( { state: 'FAIL' } )
    } else {
        clientSocket.close( () => {
            res.json( { state: 'STOP' } )
        })
    }
})

module.exports = router