const { getGenesisBlock } = require('./calcHash');
const P2PNetwork = require('path_to_your_p2pNetwork_file');

const p2pNetwork = new P2PNetwork();

async function initializeBlockchain() {
    try {
        // Create and add the first block (genesis block) to GunDB
        const genesisBlock = getGenesisBlock();
        p2pNetwork.put(genesisBlock.hash, genesisBlock);

        console.log('Blockchain initialized');
    } catch (error) {
        console.error('Error initializing block-management:', error);
        process.exit(1);
    }
}

module.exports = initializeBlockchain;
