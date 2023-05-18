const crypto = require('crypto');

function calculateHash(index, previousHash, timestamp, data) {
    const hash = crypto.createHash('sha256');
    hash.update(index + previousHash + timestamp + data);
    return hash.digest('hex');
}

module.exports = calculateHash