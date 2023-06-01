const Block = require('../models/block');
const { calculateHash, getGenesisBlock } = require('./calcHash');

async function initializeBlockchain() {
    try {
        // Проверяем, существуют ли блоки в базе данных
        const existingBlocks = await Block.find();
        if (existingBlocks.length > 0) {
            console.log('Blockchain already initialized');
            return;
        }

        // Создаем и добавляем первый блок (генезис-блок) в базу данных
        const genesisBlock = getGenesisBlock();
        await Block.create(genesisBlock);

        console.log('Blockchain initialized');
    } catch (error) {
        console.error('Error initializing blockchain:', error);
        process.exit(1);
    }
}

module.exports = initializeBlockchain;
