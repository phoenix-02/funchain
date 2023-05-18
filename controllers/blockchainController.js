const calcHash = require('../utils/calcHash');

const Block = require('../models/block');


const createBlock = (req, res) => {
    getLatestBlock().then(previousBlock=>{
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

        block.save()
            .then(() => {
                res.status(201).json({ message: 'Block created successfully' });
            })
            .catch(err => {
                console.error('Error creating block:', err);
                res.status(500).json({ message: 'Failed to create block' });
            });
    });

};


const getBlocks = (req, res) => {
    Block.find()
        .then(blocks => {
            res.status(200).json(blocks);
        })
        .catch(err => {
            console.error('Error getting blocks:', err);
            res.status(500).json({ message: 'Failed to get blocks' });
        });
};

const getGenesisBlock= () => {
    const index = 0;
    const previousHash = '0'.repeat(64); // Исходный хэш
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
}

const getLatestBlock = async () => {
    try {
        // Получаем последний блок из базы данных
        return await Block.findOne().sort({index: -1});
    } catch (error) {
        console.error('Error getting latest block:', error);
        return null;
    }
};


module.exports = {
    createBlock,
    getBlocks,
    getGenesisBlock,
    getLatestBlock,
};

