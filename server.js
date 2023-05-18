const express = require('express');
const mongoose = require('mongoose');
const config = require('./configs/config');
const blockchainRouter = require('./router/blockchainRouter');
const initializeBlockchain = require('./utils/initialize');

const app = express();
const port = process.env.PORT || 3000;

const { connectionString, options } = config.mongo;

async function startServer() {
    try {
        await mongoose.connect(connectionString, options);
        console.log('Connected to MongoDB');

        //  init genesis block if needed
        await initializeBlockchain();

        // Middleware
        app.use(express.json());

        // Routes
        app.use('/api/blockchain', blockchainRouter);

        // server start
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
}

startServer();
