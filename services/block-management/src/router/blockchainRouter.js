const express = require('express');
const router = express.Router();

module.exports = (blockchainControllerInstance) => {
    router.get('/blocks', (req, res) => {
        blockchainControllerInstance.getBlocks()
            .then(blocks => res.json(blocks))
            .catch(err => res.status(500).json({ error: err.message }));
    });

    router.get('/genesis', (req, res) => {
        blockchainControllerInstance.getGenesisBlock()
            .then(block => res.json(block))
            .catch(err => res.status(500).json({ error: err.message }));
    });

    router.get('/latest', (req, res) => {
        blockchainControllerInstance.getLatestBlock()
            .then(block => res.json(block))
            .catch(err => res.status(500).json({ error: err.message }));
    });

    router.post('/create', (req, res) => {
        blockchainControllerInstance.createBlock(req.body)
            .then(block => res.json(block))
            .catch(err => res.status(500).json({ error: err.message }));
    });

    return router;
};
