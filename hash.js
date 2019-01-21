var crypto = require('crypto');

function giveHash(currBlkData, previousHash)
{
    var mHash = "";
    var Apple =""+JSON.stringify(currBlkData)+previousHash;
    console.log("--------", Apple)
    var sha256 = crypto.createHash('sha256').update(Apple).digest("hex");
    var check = 0;
    var nonce = 0;
    while(check==0){
        
        mHash = crypto.createHash('sha256').update(Apple+nonce).digest("hex");
        console.log(mHash)

        if (mHash.charAt(0)==0 && mHash.charAt(1)==0){
            console.log('Hash is accepted!');
            console.log('At Nonce :', nonce)
            check = 1;
        }
        else
        {
            console.log('Hash is not accepted');
            nonce = nonce + 1;
        }23, Date.now(), "afec7b0b5bd3551bfd00d058ecdaed43be97e7279d23840b0ae8e1de7cb07b8b"
    }

    return mHash; 
    

}

// var test = new giveHash(23, Date.now(), "afec7b0b5bd3551bfd00d058ecdaed43be97e7279d23840b0ae8e1de7cb07b8b" );


module.exports = giveHash;




