const hash = require('./hash');
function blk(){
    this.chain = [];
    this.pendingTransactions = [];
    this.chainsize = this.chain.length;
}


blk.prototype.createNewBlock = function(tFrom, tTO ,previousBlockHash, amt_payable, credit_acc_no, debit_acc_no ){
const newBlock = {
    trans_from : tFrom,
    trans_to : tTO,
    pay : amt_payable,
    Cred_acc : credit_acc_no,
    Deb_acc : debit_acc_no,
    transaction_id : ""+tFrom+"_"+tTO+"_"+this.chain.length+1+"_"+Date.now(),
    index: this.chain.length+1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    hash: hash(this.chain.length+1, Date.now(), previousBlockHash, 
    ""+tFrom+tTO+this.chain.length+1+Date.now(), amt_payable,
    credit_acc_no, debit_acc_no),
    previousBlockHash : previousBlockHash
}


this.pendingTransactions = [];
this.chain.push(newBlock);
this.chainsize++;



return newBlock;

}
module.exports = blk;