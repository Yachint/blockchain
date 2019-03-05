const express = require('express');
const body_parser = require('body-parser');
const uuid = require('uuid/v1');
const blockchain = require('./blkchain');
var bitcoin = new blockchain()
var nodeAddress = uuid().split('-').join('');
var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
var port = process.argv[2];


app.get('/',function(req,res){
    res.send('Blockchain Practice 2.0!');
});

app.get('/blockchain',function(req,res){
    res.send(bitcoin);
});

app.post('/transactions',function(req,res){
    var blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recepeint);
    res.json({note : 'Transaction will be added in block'+blockIndex});
});

app.get('/mine',function(req,res){
    const lastBlock  = bitcoin.getLastBlock();
    const prev_hash = lastBlock['hash'];

    const curr_blk_data = {
        index : lastBlock['index'] + 1,
        transactions: bitcoin.pendingtransactions
    }

    var nonce = bitcoin.POW(prev_hash, curr_blk_data);
    var hash = bitcoin.hashBlock(prev_hash, curr_blk_data, nonce);
    bitcoin.createNewTransaction(12.5,'Blockchain-Network',nodeAddress);
    const new_blk = bitcoin.createNewBlock(hash, prev_hash, nonce);

    res.json({
        note : 'Block ADDED!',
        block : new_blk
    })
});

app.listen(8080,function(){
    console.log('Starting server on port 8000');
})
