const express = require('express');
const { WebSocketServer } = require('ws');

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const wss = new WebSocketServer({ server });
const clients = new Map(); 

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'register') {
            clients.set(ws, data.username);
            console.log(`User registered: ${data.username}`);
        } else if (data.type === 'message') {
            const sender = clients.get(ws) || 'Unknown';
            const formattedMessage = JSON.stringify({ sender, message: data.message, isAdmin: false });

            wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(formattedMessage);
                }
            });
        } else if (data.type === 'admin') {
            console.log(`Admin broadcast: ${data.message}`);
            const adminMessage = JSON.stringify({ sender: 'Admin', message: data.message, isAdmin: true });
            wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(adminMessage);
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});
