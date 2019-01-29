var crypto = require('crypto');
var eccrypto = require('eccrypto');
const fs = require('fs');

var private_key = crypto.randomBytes(32);
var public_Key  = eccrypto.getPublic(private_key);

const pdf = fs.readFileSync('decoded.pdf', 'utf-8');

var msg = crypto.createHash("sha256").update(pdf).digest();

eccrypto.sign(private_key, msg).then((sig) => {
    console.log("Signature in DER format: ", sig);
    eccrypto.verify(public_Key, msg, sig).then(() => {
        console.log("Signature is OK");
    }).catch(() => {
        console.log("Signature is BAD");
    });
});