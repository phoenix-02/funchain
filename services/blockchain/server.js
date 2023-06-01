const express = require('express');
const mongoose = require('mongoose');
const config = require('./configs/config');
const blockchainRouter = require('./src/router/blockchainRouter');
const initializeBlockchain = require('./src/utils/initialize');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

const { connectionString, options } = config.mongo;

async function startServer() {
    try {
        await mongoose.connect(connectionString, options);
        console.log('Connected to MongoDB');

        // init genesis block if needed
        await initializeBlockchain();

        // Middleware
        app.use(express.json());

        // Routes
        app.use('/api/blockchain', blockchainRouter);

        // HTTP server and Socket.IO initialization
        const httpServer = http.createServer(app);
        const io = new Server(httpServer);

        // Set io instance in blockchainController
        const blockchainController = require('./src/controllers/blockchainController');
        blockchainController.setSocketIO(io);

        io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('create_block', () => {
                blockchainController.createBlock();
            });

            socket.on('get_blocks', () => {
                blockchainController.getBlocks(socket);
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
