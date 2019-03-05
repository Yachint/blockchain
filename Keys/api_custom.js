const express = require('express');
const blockchain = require('./prac_blkchain');
const body_parser = require('body-parser');
const uuid = require('uuid/v1');
var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
var nodeAddress = uuid().split('-').join('');
const bitcoin = new blockchain();
const port = process.argv[2];

app.get('/',function(req,res){
    res.send('Welcome to BlockChain Miner');
});

app.get('/blockchain',function(req,res){
    res.send(bitcoin);
});

app.post('/transactions',function(req,res){
    var blockindex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recepeint);
    res.json({note : 'Transaction will be added in block ${blockindex}.'});
});

app.get('/mine',function(req,res){
    const lastBlock = bitcoin.getLastBlock();
    const prev_hash = lastBlock['hash'];

    const curr_blk_data = {
        index : lastBlock['index'] + 1,
        transaction : bitcoin.pendingtransactions
    }

    const nonce = bitcoin.POW(prev_hash, curr_blk_data);
    const hash = bitcoin.hashBlock(nonce, prev_hash, curr_blk_data);
    bitcoin.createNewTransaction(12.5,'00',nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce, hash, prev_hash);

    res.json({
        block : newBlock,
        note : 'Block added.'
    })
});

app.listen(port, function(){
    console.log("Server Started at port : 8080.....");
});
