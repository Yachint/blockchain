const sha256 = require('sha256');
const curr_url = process.argv[3];

function blockchain(){
    this.chain = [];
    this.pendingtransactions = [];
    this.currentNode = curr_url;
    this.nodeAddress = [];
    this.createNewBlock(100, 0, 0);    
}

blockchain.prototype.createNewBlock = function(hash, prev_hash, nonce){

    const new_blk = {
        index : this.chain.length + 1,
        timestamp : Date.now(),
        hash : hash,
        prev_hash : prev_hash,
        nonce : nonce,
        transactions : this.pendingtransactions
    }

    this.pendingtransactions = [];
    this.chain.push(new_blk);
    return new_blk;
}

blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length -1];
}

blockchain.prototype.createNewTransaction = function(amt, sender, recepeint){

    const new_tx = {
        amount : amt,
        sender : sender,
        recepeint : recepeint
    }

    this.pendingtransactions.push(new_tx);
    return this.getLastBlock()['index'] + 1;
}

blockchain.prototype.hashBlock = function(prev_hash, curr_blk_data, nonce){
    var data = ''+prev_hash+curr_blk_data+nonce;
    return sha256(data);
}

blockchain.prototype.POW = function(prev_hash, curr_blk_data){
    let nonce = 0;
    let hash = this.hashBlock(prev_hash, curr_blk_data, nonce);
    while(hash.substring(0,4) != '0000'){
        nonce++;
        hash = this.hashBlock(prev_hash, curr_blk_data, nonce);
        console.log(hash);
        console.log('--->');
    }

    return nonce;
}

module.exports = blockchain;
