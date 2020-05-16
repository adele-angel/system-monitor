# System Performance Monitor

A React.js, Node.js & Express application for monitoring system performance of each device connected to network. This project was created for the purpose of learning Redis, socket.io and clusters.

## Built with

- Node.js as runtime environment
- Express.js as server-side framework
- Mongoose ORM for database (MongoDB)
- Redis for scalability (in-memory data structure store)
- Socket.IO (JavaScript library for realtime web applications)
- React.js as client-side framework
- Node OS and systeminformation packages
- JSX, JavaScript
- HTML5, CSS3, Bootstrap 4

## Packages

**React Client side dependencies**

```
$ npm install --save socket.io-client
```

**Node Server/Client side dependencies**

```
$ npm install --save express farmhash socket.io redis mongoose socket.io-client socket.io-redis systeminformation
$ npm install --save-dev nodemon
```

## Usage

```
$ git clone https://github.com/adele-angel/system-monitor.git
$ cd /system-monitor
```

```
$ cd /react-client
$ npm install
$ npm start
```

Note: change server url in /react-client/util/socketConnection.js to let socket = io.connect('http://localhost:8080'); in order to run locally

```
$ cd /node-files
$ npm install
$ nodemon
```
