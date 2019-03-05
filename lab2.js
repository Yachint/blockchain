const hash = require('./hash');
const merkle = require('./Merkle_tree');
var crypto = require('crypto');
const currentNodeUrl = process.argv[3];
function blk(){
    this.chain = [];
    this.pendingTransactions = [];
    this.chainsize = this.chain.length;
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(100,'0','0');
}

const createTransHash = (amt, sender, recvr) => {
    var info = ''+amt+sender+recvr;
    var sha256 = crypto.createHash('sha256').update(info).digest("hex");
    return sha256;
}


blk.prototype.getLastBlock = function(){
    return this.chain[this.chain.length-1];
}

blk.prototype.createNewTransaction = function(amount,sender,recepeint){
    const newTransaction = {
        amount:amount,
        sender:sender,
        recepeint:recepeint,
        hash: crypto.createHash('sha256').update(createTransHash(amount,sender,recepeint)).digest("hex")

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
    merkle_root : merkle(this.pendingTransactions),
    previousBlockHash : previousBlockHash
}


this.pendingTransactions = [];
this.chain.push(newBlock);
this.chainsize++;



return newBlock;

}
module.exports = blk;