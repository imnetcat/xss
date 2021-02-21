'use strict';

const WebSocketServer = require('ws').Server;
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"));

const server = http.createServer(app);
server.listen(port);

const wss = new WebSocketServer({server: server});
console.log('Server ready');

const subscribers  = new Array();

wss.on('connection', async (sock, req) => {
  console.log('Connection open from', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
  const serverSubscriber = false;
  let subId = 0;
  sock.on('message', async (data) => {
    if(data === 'i wnt sub plz man') {
		serverSubscriber = true;
		subId = subscribers.length;
		subscribers.push(sock);
		sock.send('okey man');
		return;
	}
	
	subscribers.forEach((sub) => {
		sub.send(data);
	});
  });
  
  sock.on("close", async (event) => {
    console.log("Connection closed");
	if(serverSubscriber) {
		subscribers.splice(subId, 1);
	}
  });
});
