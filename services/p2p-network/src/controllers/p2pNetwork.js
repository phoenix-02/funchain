const P2PNode = require('../models/p2pNode');

class P2PNetwork {
    constructor() {
        this.node = new P2PNode();
    }

    get (key) {
        return this.node.get(key);
    }

    put (key, value) {
        this.node.put(key, value);
    }

    getKeys () {
        return this.node.getKeys();
    }
}

module.exports = P2PNetwork;
