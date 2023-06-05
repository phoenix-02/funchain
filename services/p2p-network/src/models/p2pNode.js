const Gun = require('gun');

class P2PNode {
    constructor () {
        this.node = Gun();
    }

    get (key) {
        return this.node.get(key);
    }

    put (key, value) {
        this.node.get(key).put(value);
    }

    getKeys () {
        return this.node.get('keys');
    }
}

module.exports = P2PNode;
