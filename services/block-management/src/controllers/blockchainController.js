const calcHash = require('../utils/calcHash');
const WebSocket = require('ws');

const FAKEBLOCK = {
    index: 0,
    timestamp: new Date().getTime(),
    data: 'Your data here',
    previousHash: '0',
    hash: '0',
};

class BlockchainController {
    constructor() {
        this.io = null;
        this.ws = new WebSocket('ws://localhost:8080');

        this.requestId = 0;
        this.requests = {};

        // Listen for responses from the p2p network
        this.ws.addEventListener('message', (event) => {
            const { id, data } = JSON.parse(event.data);
            if (this.requests[id]) {
                this.requests[id](data);
                delete this.requests[id];
            }
        });

    }
    setSocketIO(io) {
        this.io = io;
    }
    // Create a new block
    createBlock() {
        console.log('asd1')
        this.getLatestBlock().then((previousBlock = FAKEBLOCK) => {
            console.log('asd2')

            const timestamp = new Date().getTime();
            const index = previousBlock.index + 1;
            const data = 'Your data here';
            const hash = calcHash(index, previousBlock.hash, timestamp, data);

            const block = {
                index,
                timestamp,
                data,
                previousHash: previousBlock.hash,
                hash,
            };

            // Send new block to all clients via WebSocket if the connection is open
            if (this.ws.readyState === WebSocket.OPEN) {
                this.io.emit('new_block', block);
                this.ws.send(JSON.stringify({ type: 'put', data: { key: block.hash, value: block } }));
            } else {
                console.error('Unable to send block to P2P network: WebSocket connection is not open');
                // Handle the absence of a WebSocket connection here
            }
        });
    }

    // Send a request to the p2p network and return a promise that resolves with the response
    sendRequest(type, data) {
        return new Promise((resolve) => {
            const id = this.requestId++;
            this.requests[id] = resolve;

            // Send the request if the WebSocket connection is open
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ id, type, data }));
            } else {
                console.error('Unable to send request to P2P network: WebSocket connection is not open');
                // Handle the absence of a WebSocket connection here
            }
        });
    }

    // Get all blocks
    getBlocks() {
        return this.sendRequest('get_all');
    }

    // Get genesis block
    getGenesisBlock() {
        return this.sendRequest('get', '0');
    }

    // Get the latest block
    getLatestBlock() {
        return this.sendRequest('get_latest');
    }
}

module.exports = BlockchainController;
