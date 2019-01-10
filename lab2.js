const hash = require('./hash');
function blk(){
    this.chain = [];
    this.pendingTransactions = [];
}

blk.prototype.createNewBlock = function(previousBlockHash){
const newBlock = {
    index: this.chain.length+1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    hash: new hash(index, timestamp, previousBlockHash),
    previousBlockHash : previousBlockHash
}


this.pendingTransactions = [];
this.chain.push(newBlock);



return newBlock;

}
module.exports = blk;