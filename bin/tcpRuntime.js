const net = require('net')

module.exports = () => {
	const server = net.createServer( (client) => {
		console.log('client connected')

		client.on('end', () => {
			console.log('client disconnected')
		})
		client.on('data', (data) => {
			console.log(data.toString())
		})
	})

	server.on('close', () => {
		console.log('close Server')
	})

	return server
}
