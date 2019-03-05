var express = require('express');
const process = require('process');
const hash = require('./hash');
var app = express();
const blockchain = require('./lab2');
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join("");
const bodyparser = require('body-parser');
const bitcoin = new blockchain();
const rp = require('request-promise');

const port = process.argv[2];

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

app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1){
        bitcoin.networkNodes.push(newNodeUrl);
    }

    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri : networkNodeUrl+'/register-node',
            method : 'POST',
            body : { newNodeUrl: newNodeUrl},
            json : true
        };

        regNodesPromises.push(rp(requestOptions));
    });

    Promise.all(regNodesPromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method : 'POST',
            body : {allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
            json : true
        };

        return rp(bulkRegisterOptions);
    }).then(data =>{
        res.json({note:'New Node registered with network successfully'});
    });
        
    
    
});

app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1
    && bitcoin.currentNodeUrl != newNodeUrl){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({ note: 'New node registered succesfully!'});
});

app.post('/register-nodes-bulk', function(req, res){

})


app.listen(port, function(){
    console.log('listening on port '+port+' ...');
});
