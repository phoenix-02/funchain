const express = require('express');
const blockchainRouter = require('./src/router/blockchainRouter');
const BlockchainController = require('./src/controllers/blockchainController');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

// HTTP server and Socket.IO initialization
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Create an instance of BlockchainController with io
const blockchainControllerInstance = new BlockchainController(io);

async function startServer() {
    try {
        // Middleware
        app.use(express.json());

        // Routes
        app.use('/api/blockchain', blockchainRouter(blockchainControllerInstance));

        // Set io instance in blockchainController
        blockchainControllerInstance.setSocketIO(io);


        io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('new_block', () => {
                blockchainControllerInstance.createBlock();
            });
            socket.on('get_blocks', () => {
                blockchainControllerInstance.getBlocks();
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        // server start
        httpServer.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
}

startServer();
