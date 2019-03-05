var crypto = require('crypto');
var eccrypto = require('eccrypto');
const fs = require('fs');

// var private_key = crypto.randomBytes(32);
// var public_key  = eccrypto.getPublic(private_key);

const private_key = fs.readFileSync('private_ECDA.pem', 'utf-8');
const public_key = fs.readFileSync('public_ECDA.pem', 'utf-8');

const pdf = fs.readFileSync('decoded.pdf', 'utf-8');

var msg = crypto.createHash("sha256").update(pdf).digest();

eccrypto.sign(private_key, msg).then((sig) => {
    console.log("Signature in DER format: ", sig);
    eccrypto.verify(public_key, msg, sig).then(() => {
        console.log("Signature is OK");
    }).catch(() => {
        console.log("Signature is BAD");
    });
});