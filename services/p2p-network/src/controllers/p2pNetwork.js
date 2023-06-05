const Gun = require('gun');
const WebSocket = require('ws');

class P2PNetwork {
    constructor() {
        this.gun = Gun({
            file: '../../radata',
        });
        this.wss = new WebSocket.Server({ port: 8080 });
        this.listenForBlocks();
        this.listenForWebSocketMessages();
    }

    // Fetch data by key
    get(key) {
        return this.gun.get(key);
    }

    // Add data by key
    put(key, data) {
        this.gun.get(key).put(data);
    }
    getAll(key, data) {
        return this.gun.get('test');
    }
    getLatest(key, data) {
        return this.gun.get('test');
    }

    // Listen for new blocks and add them to GunDB
    listenForBlocks() {
        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                const { type, block } = JSON.parse(message);
                if (type === 'new_block') {
                    this.put(block.hash, block);
                }
            });
        });
    }


    // Listen for WebSocket messages
    listenForWebSocketMessages() {
        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                const { id, type, data } = JSON.parse(message);
                if (type === 'put') {
                    this.put(data.key, data.value);
                } else if (type === 'get') {
                    ws.send(JSON.stringify({ id, data: this.get(data.key) }));
                } else if (type === 'get_all') {
                    // You need to implement this method in your P2PNetwork class
                    ws.send(JSON.stringify({ id, data: this.getAll() }));
                } else if (type === 'get_latest') {
                    // You need to implement this method in your P2PNetwork class
                    ws.send(JSON.stringify({ id, data: this.getLatest() }));
                }
            });
        });
    }
}

module.exports = P2PNetwork;
