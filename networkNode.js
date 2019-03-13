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

app.post('/transaction/broadcast', function(req,res){
    const newTx = bitcoin.createNewTransaction(req.body.amount,
        req.body.sender, req.body.recepeint);
    bitcoin.ATTPT(newTx);

    const requestPromises = []
    bitcoin.networkNodes.forEach(net_urls => {
        const requestOptions = {
            uri : net_urls + '/transaction',
            method : 'POST',
            body : newTx,
            json : true
        }

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then(data => {
        res.json({
            note: 'Transaction Broadcast succssefull' 
        })
    })
});

app.post('/transaction', function(req,res){
   const newTx = req.body;
   const blk_index = bitcoin.ATTPT(newTx);
   res.json({note : 'Transaction will be added in block :'+blk_index});
});

app.post('/receive-new-block', function(req,res){
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    if(lastBlock.hash === newBlock.previousBlockHash && 
        lastBlock['index']+1 === newBlock['index']){
            bitcoin.chain.push(newBlock);
            bitcoin.pendingTransactions = [];
            res.json({
                note: 'New block received and accepted',
                newBlock : newBlock
            });
    }
    else{
        res.json({
            note : 'New Block rejected',
            newBlock : newBlock
        })
    }
});

app.get('/mine', function(req,res){
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index : lastBlock['index']+1
    };
    const makeHash = hash(currentBlockData, previousBlockHash);
    
    const newBlock = bitcoin.createNewBlock(previousBlockHash);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri : networkNodeUrl + '/receive-new-block',
            method : 'POST',
            body : {newBlock : newBlock},
            json : true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then(data => {
        const req_options = {
            uri : bitcoin.currentNodeUrl + '/transaction/broadcast',
            method : 'POST',
            body : {
                amount : 12.5,
                sender : "00",
                recepeint : nodeAddress
            },
            json : true
        }

        return rp(req_options); 
    }).then(data => {
        res.json({
            note:"new block mined & broadcasted successfully",
            block: newBlock 
        });
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
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        if (bitcoin.networkNodes.indexOf(networkNodeUrl) == -1
        && bitcoin.currentNodeUrl != networkNodeUrl){
            bitcoin.networkNodes.push(networkNodeUrl);
        }
    });
    res.json({note: 'Bulk Registration Accepted.'});
});


app.listen(port, function(){
    console.log('listening on port '+port+' ...');
});
