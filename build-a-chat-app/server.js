import http from 'http';
import fs from 'fs';

import { WebSocketServer } from 'ws';

const server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
})


const wss = new WebSocketServer({ server });

function broadcast(wss, data) {
  const payload = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

wss.on('connection', (socket, req) => {
  const username = new URL(req.url, 'http://localhost').searchParams.get('username');

  broadcast(wss, {
    type: 'system',
    text: `${username} joined`,
  });

  socket.on('message', (data) => {
    try {
      const { username: senderUsername, text } = JSON.parse(data);
      broadcast(wss, {
        type: 'chat',
        username: senderUsername,
        text,
      });
    } catch (err) {
      console.error('Invalid message format received:', err);
    }
  });

  socket.on('close', () => {
    broadcast(wss, {
      type: 'system',
      text: `${username} left`,
    });
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});



