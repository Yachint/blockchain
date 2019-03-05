const sha256 = require('sha256');

function blockchain(){
    this.chain = [];
    this.pendingtransactions = [];
    this.createNewBlock(100,'0','0');
};

blockchain.prototype.createNewBlock = function(nonce, hash, prev_hash) {
    const newBlock = {
        index : this.chain.length + 1,
        timestamp : Date.now(),
        hash : hash,
        prev_hash : prev_hash,
        nonce : nonce,
        transactions : this.pendingtransactions
    }

    this.pendingtransactions = []
    this.chain.push(newBlock);
    return newBlock

};

blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
};

blockchain.prototype.createNewTransaction = function(amount, sender, recepeint){

    const newTrans = {
        amount : amount,
        sender : sender,
        recepeint : recepeint
    }

    this.pendingtransactions.push(newTrans);
    return this.getLastBlock()['index'] + 1;
};

blockchain.prototype.hashBlock = function(nonce, prev_hash, curr_blk_data){
    var data = ''+nonce+prev_hash+curr_blk_data;
    return sha256(data);
};

blockchain.prototype.POW = function(prev_hash, curr_blk_data){
    let nonce  = 0;
    let hash = this.hashBlock(nonce, prev_hash, curr_blk_data);
    while(hash.substring(0,4) != '0000'){
        nonce++;
        hash = this.hashBlock(nonce, prev_hash, curr_blk_data);
        console.log(hash);
    } 

    return nonce;
};

module.exports = blockchain;