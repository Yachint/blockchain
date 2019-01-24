var express = require('express');
const hash = require('./hash');
var app = express();
const blockchain = require('./lab2');
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join("");
const bodyparser = require('body-parser');
const bitcoin = new blockchain();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/', function(req,res){
    res.send('Hello world')
});

app.get('/blockchain', function(req,res){
    res.send(bitcoin);
});

app.post('/transaction', function(req,res){
   const blockindex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recepeint);
   res.json({note : 'Transaction will be added in block ${blockindex}.'});
});

app.get('/mine', function(req,res){
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index : lastBlock['index']+1
    };
    const makeHash = hash(currentBlockData, previousBlockHash);
    bitcoin.createNewTransaction(12.5,"00",nodeAddress);
    const newBlock = bitcoin.createNewBlock(previousBlockHash)
    res.json({
        note:"new block mined successfully",
        block: newBlock
    });
});

app.listen(8081, function(){
    console.log('listening on port 8080...');
});
