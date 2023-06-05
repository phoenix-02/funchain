const crypto = require('crypto');

// Function to calculate hash for a block
function calculateHash(index, previousHash, timestamp, data) {
    const hash = crypto.createHash('sha256');
    hash.update(index + previousHash + timestamp + data);
    return hash.digest('hex');
}

module.exports = calculateHash;
