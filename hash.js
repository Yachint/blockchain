var crypto = require('crypto');

function giveHash(index, timestamp, previousHash)
{
    var sIndex = "" + index;
    var sTimestamp = "" + timestamp;
    var sPreviousHash = "" + previousHash
    var mind  = 56;
    var Apple = index+timestamp+previousHash;
    console.log(Apple)
    var sha256 = crypto.createHash('sha256').update(Apple).digest("hex");
    var check = 0;
    var nonce = 0;
    while(check==0){
        
        var mHash = crypto.createHash('sha256').update(Apple+nonce).digest("hex");
        console.log(mHash)

        if (mHash.charAt(0)==0 && mHash.charAt(1)==0 && mHash.charAt(2)==0 && mHash.charAt(3)==0){
            console.log('Hash is accepted!');
            console.log('At Nonce :', nonce)
            check = 1;
        }
        else
        {
            console.log('Hash is not accepted');
            nonce = nonce + 1;
        }
    }https://www.google.com/

    return mHash; 
    

}

var test = new giveHash(23, Date.now(), );
console.log(test);

module.exports = giveHash;




