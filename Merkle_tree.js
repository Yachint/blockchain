const crypto = require('crypto');

const HashIt = (msg) => {
    return crypto.createHash('sha256').update(msg).digest("hex");
}

function createMerkle(pendingTransactions){
    //console.log(pendingTransactions)
    var trans_array = pendingTransactions
    if (trans_array.length==0){
        return 0;
    }
    var len = trans_array.length
    var hash_store = []

    for(var i=0; i<len; i++){
        hash_store.push(trans_array[i].hash);

    }

    if (len%2!=0){
        hash_store.push(hash_store[len-1]);
    }

    //console.log(hash_store);
    
    while(hash_store.length!=1){
        test = [];
        
        for(var i=0; i<hash_store.length; i+=2){
            //console.log('HIIIIIII')
            var A = HashIt(HashIt(hash_store[i]+hash_store[i+1]));
            test.push(A);
            
        }
        //console.log(test);
        hash_store = test;
        if (hash_store.length == 1){
            break;
        }
        
    }

    console.log('Root Merkle Hash :', hash_store[0]);
    return hash_store[0];
    
    

}

module.exports = createMerkle;