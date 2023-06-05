const P2PNetwork = require('./src/controllers/p2pNetwork');
const { Server } = require('socket.io');


// HTTP server and Socket.IO initialization
const io = new Server();

const network = new P2PNetwork();

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('put', ({key, block}) => {
        network.put(key, block);
    });
    // socket.on('get_blocks', () => {
    //     blockchainControllerInstance.getBlocks();
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



network.put('test', { hello: 'world' });
network.get('test').once((data, key) => {
    console.log('Data: ', data);
});
// network.getKeys().once((keys) => {
//     console.log('Keys: ', keys);
// });