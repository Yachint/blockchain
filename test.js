const Blockchain = require('./lab2');
const bitcoin = new Blockchain();
bitcoin.createNewBlock(bitcoin.chain[0].hash);
bitcoin.createNewTransaction(100,'aaa111','bbb111');
bitcoin.createNewBlock(bitcoin.chain[1].hash);
bitcoin.createNewTransaction(100,'ccc111','ddd111');
bitcoin.createNewTransaction(100,'eee111','fff111');
bitcoin.createNewTransaction(100,'ggg111','hhh111');
console.log(bitcoin);

