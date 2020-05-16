import io from 'socket.io-client';

// Connection to the server
let socket = io.connect('http://localhost:8080');
socket.emit('client');

export default socket;
