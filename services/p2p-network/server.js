const P2PNetwork = require('./src/controllers/p2pNetwork');

const network = new P2PNetwork();

network.put('test', { hello: 'world' });
network.get('test').once((data, key) => {
    console.log('Data: ', data);
});
network.getKeys().once((keys) => {
    console.log('Keys: ', keys);
});