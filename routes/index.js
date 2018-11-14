var express = require('express');
const tcpServer = require('../bin/tcpRuntime')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tcpCall', (req, res) => {
	const serverSocket = tcpServer()
	serverSocket.listen(3333, () => {
		console.log('server bound')
	})

	res.json( { state: 'RUN' } )
})

module.exports = router
