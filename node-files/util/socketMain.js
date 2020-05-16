const keys = require('./../config/keys');
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const Machine = require('./../models/Machine');

function socketMain(io, socket) {
	let macA; // Machine address

	socket.on('client', (key) => {
		socket.join('ui'); // UI client has joined
		console.log('A react client has joined');

		Machine.find({}, (err, docs) => {
			docs.forEach((machine) => {
				// On load assume that all machines are offline
				machine.isActive = false;
				io.to('ui').emit('data', '');
			});
		});
	});

	socket.on('disconnect', () => {
		Machine.find({ macA: macA }, (err, docs) => {
			if (docs.length > 0) {
				// Send one last emit to React client
				docs[0].isActive = false;
				io.to('ui').emit('data', docs[0]);
			}
		});
	});

	// A machine has connected, check to see if it's new - if so, add it
	socket.on('initPerfData', async (data) => {
		// Update the socket connect function scoped variable
		macA = data.macA;
		// Check machine existence in database
		const mongooseResponse = await checkAndAdd(data);
		console.log('$', mongooseResponse);
	});

	socket.on('perfData', (data) => {
		io.to('ui').emit('data', data);
	});
}

function checkAndAdd(data) {
	return new Promise((resolve, reject) => {
		Machine.findOne({ macA: data.macA }, (err, doc) => {
			if (err) {
				reject(err);
			} else if (doc === null) {
				// The record is not in the database
				let newMachine = new Machine(data);
				newMachine.save(); // Add new record to database
				resolve('added');
			} else {
				resolve('found'); // Machine already exists in the database
			}
		});
	});
}

module.exports = socketMain;
