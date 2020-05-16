/**
 * Node server
 * Socket.io server that will service both node and react clients
 *
 * Entry point for the cluster which will make workers
 * and the workers will do the Socket.io handling
 */

const express = require('express');
const cluster = require('cluster');
const net = require('net');
const socketio = require('socket.io');
const io_redis = require('socket.io-redis');
const farmhash = require('farmhash');

const socketMain = require('./util/socketMain');
const keys = require('./config/keys');
const port = keys.port;
const socketClient = require('./client')(port);

const num_processes = require('os').cpus().length;

if (cluster.isMaster) {
	// This stores the workers in order to be able to reference
	// them based on source IP address
	let workers = [];

	// Helper function for spawning worker at index 'i'.
	let spawn = function (i) {
		workers[i] = cluster.fork();

		// Restart worker on exit
		workers[i].on('exit', function (code, signal) {
			spawn(i);
		});
	};

	// Spawn workers
	for (var i = 0; i < num_processes; i++) {
		spawn(i);
	}

	// Helper function for getting a worker index based on IP address.
	// Converting the IP address to a number by removing non numeric
	// characters, then compressing it to the number of existing slots
	const worker_index = function (ip, len) {
		return farmhash.fingerprint32(ip) % len;
	};

	// Start up a tcp connection via the net module instead OF the http module
	// Express will use http, but there should be an independent tcp port open for cluster to work
	// This is the port that will face the internet
	const server = net.createServer({ pauseOnConnect: true }, (connection) => {
		// Receive a connection and pass it to the appropriate worker
		// Get the worker for this connection's source IP and pass it the connection
		let worker = workers[worker_index(connection.remoteAddress, num_processes)];
		worker.send('sticky-session:connection', connection);
	});
	server.listen(port);
	console.log(`Master listening on port ${port}`);
} else {
	// Note: no need to use a port here because the master listens on it
	let app = express();
	// Hide internal server to the outside world
	const server = app.listen(0, 'localhost');
	const io = socketio(server);

	// Use redis adapter with socket.io middleware
	io.adapter(io_redis({ host: 'localhost', port: keys.redisPORT }));

	// On connection, send the socket over to socketMain
	io.on('connection', function (socket) {
		socketMain(io, socket);
		console.log(`connected to worker: ${cluster.worker.id}`);
	});

	// Listen to messages sent from the master and ignore everything else
	process.on('message', function (message, connection) {
		if (message !== 'sticky-session:connection') {
			return;
		}

		// Emulate a connection event on the server by emitting the
		// event with the connection the master sent
		server.emit('connection', connection);

		connection.resume();
	});
}
