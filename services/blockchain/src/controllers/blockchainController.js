const calcHash = require('../utils/calcHash');
const Block = require('../models/block');
let io;

const setSocketIO = (socketIO) => {
    io = socketIO;
};

const createBlock = () => {
    getLatestBlock().then((previousBlock) => {
        const timestamp = new Date().getTime();
        const index = previousBlock.index + 1;
        const data = 'Your data here';
        const hash = calcHash(index, previousBlock.hash, timestamp, data);

        const block = new Block({
            index,
            timestamp,
            data,
            previousHash: previousBlock.hash,
            hash,
        });

        block
            .save()
            .then(() => {
                io.emit('new_block', block); // Отправляем новый блок всем клиентам через WebSocket
            })
            .catch((err) => {
                console.error('Error creating block:', err);
            });
    });
};

const getBlocks = (socket) => {
    Block.find()
        .then((blocks) => {
            socket.emit('blocks', blocks); // Отправляем все блоки только конкретному клиенту через WebSocket
        })
        .catch((err) => {
            console.error('Error getting blocks:', err);
        });
};

const getGenesisBlock = () => {
    const index = 0;
    const previousHash = '0'.repeat(64);
    const timestamp = new Date().getTime();
    const data = 'Genesis Block';
    const hash = calcHash(index, previousHash, timestamp, data);

    return {
        index,
        previousHash,
        timestamp,
        data,
        hash,
    };
};

const getLatestBlock = async () => {
    try {
        return await Block.findOne().sort({ index: -1 });
    } catch (error) {
        console.error('Error getting latest block:', error);
        return null;
    }
};

module.exports = {
    setSocketIO,
    createBlock,
    getBlocks,
    getGenesisBlock,
    getLatestBlock,
};
