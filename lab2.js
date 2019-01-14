const hash = require('./hash');
function blk(){
    this.chain = [];
    this.pendingTransactions = [];
    this.chainsize = this.chain.length;
    this.createNewBlock(100,'0','0');
}

blk.prototype.getLastBlock = function(){
    return this.chain[this.chain.length-1];
}

blk.prototype.createNewTransaction = function(amount,sender,recepeint){
    const newTransaction = {
        amount:amount,
        sender:sender,
        recepeint:recepeint
    };
    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()['index']+1;
}


blk.prototype.createNewBlock = function(previousBlockHash){
const newBlock = {
    index: this.chain.length+1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    hash: hash(this.pendingTransactions, previousBlockHash),
    previousBlockHash : previousBlockHash
}


this.pendingTransactions = [];
this.chain.push(newBlock);
this.chainsize++;



return newBlock;

}
module.exports = blk;